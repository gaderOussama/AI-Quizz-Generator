import os
import json
import re
from dotenv import load_dotenv
import fitz  # PyMuPDF
from groq import Groq  # Groq Python SDK

load_dotenv()

# Initialize Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    """Extract text from PDF bytes using PyMuPDF."""
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text() + "\n\n"
    return text.strip()

def _extract_json(text):
    """Try to safely parse JSON from LLM output."""
    try:
        return json.loads(text)
    except Exception:
        match = re.search(r'(\[.*\])', text, re.S)
        if match:
            try:
                return json.loads(match.group(1))
            except Exception:
                return []
        return []

def call_groq_llm(prompt: str, max_tokens=800):
    """Send the prompt to Groq and return the model's text output."""
    completion = client.chat.completions.create(
        model="llama3-8b-8192",  # Change model if needed
        messages=[
            {"role": "system", "content": "You are an AI that generates multiple-choice quizzes."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=max_tokens
    )
    return completion.choices[0].message.content


def generate_quiz(pdf_bytes: bytes, difficulty='medium', num_questions=10):
    """Extract text from PDF and generate a quiz."""
    text = extract_text_from_pdf(pdf_bytes)

    prompt = (
        f"""Generate a JSON array of multiple-choice quiz questions based on the text below. 
        Each question should have: 
        - 'question' (string)  
        - 'choices' (array of 4 strings)  
        - 'answer' (index 0-3)  
        - 'explanation' (string).  

        Difficulty level: {difficulty}.  
        Generate up to {num_questions} questions.

        Text:
        {text}
        """
    )

    llm_response = call_groq_llm(prompt)
    questions = _extract_json(llm_response)
    return questions[:num_questions]