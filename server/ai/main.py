
# server/ai/main.py

import os
import base64
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from flow import generate_quiz
import uvicorn

load_dotenv()

app = FastAPI()

# Allow CORS from all origins (adjust in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_methods=["*"],
    allow_headers=["*"],
)

class PDFRequest(BaseModel):
    pdf_base64: str
    difficulty: str = "medium"
    num_questions: int = 10

@app.get("/")
async def root():
    return {"message": "AI Quiz Generator API is running"}

@app.post("/generate-quiz")
async def generate_quiz_endpoint(req: PDFRequest):
    pdf_bytes = base64.b64decode(req.pdf_base64)
    questions = generate_quiz(pdf_bytes, req.difficulty, req.num_questions)
    return {"questions": questions}

if __name__ == "__main__":
    # Get port from env var or use 5000 as default
    port = int(os.getenv("AI_SERVICE_PORT", 5000))

    print(f"Starting AI microservice on :{port} ...")
    uvicorn.run("main:app", port=port, reload=True)
