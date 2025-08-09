# 📚 AI Quiz Generator

An AI-powered application that generates multiple-choice quizzes from **text input** or **uploaded PDF files** using the Groq API and LangGraph.  
The project combines a **React frontend** and a **Node.js/Python backend** to deliver fast, automated question generation.

---

## 🚀 Features
- **Upload PDF** or **Enter Text** to generate quizzes.
- **Automatic question formatting** (question, 4 choices, correct answer, and explanation).
- **Supports difficulty levels** (`easy`, `medium`, `hard`).
- **Responsive and clean UI** built with React + TailwindCSS.
- **AI-powered quiz generation** using Groq LLM through LangGraph.

---

## 🛠 Tech Stack
### **Frontend**
- React
- TailwindCSS
- Axios (for API calls)

### **Backend**
- Node.js (Express.js)
- Python (LangGraph + PyMuPDF)
- Multer (file uploads)
- dotenv (environment variables)

### **AI**
- Groq API for LLM-powered question generation
- LangGraph for structured AI flow

---

## 📂 Project Structure
ai-quiz-generator/
│
├── client/ # React frontend
│ ├── src/
│ ├── public/
│ └── package.json
│
├── server/ # Node.js backend
│ ├── controllers/
│ ├── routes/
│ ├── index.js
│ └── package.json
│
├── ai/ # Python AI logic
│ ├── flow.py
│ └── requirements.txt
│
├── .gitignore
├── README.md
└── .env

yaml
Copier
Modifier

---

## ⚙️ Setup & Installation
### **1. Clone the repository**
```bash
git clone https://github.com/your-username/ai-quiz-generator.git
cd ai-quiz-generator
2. Install Frontend Dependencies
bash
Copier
Modifier
cd client
npm install
3. Install Backend Dependencies
bash
Copier
Modifier
cd ../server
npm install
4. Install Python AI Dependencies
bash
Copier
Modifier
cd ../ai
pip install -r requirements.txt
5. Create .env file in both backend & AI folders
Example:

ini
Copier
Modifier
GROQ_API_KEY=your_groq_api_key
▶️ Run the Project
Backend
bash
Copier
Modifier
cd server
node index.js
Frontend
bash
Copier
Modifier
cd client
npm run dev
AI Service
bash
Copier
Modifier
cd ai
python flow.py
📈 Future Improvements
Add user authentication & quiz saving.

Support for other file formats (DOCX, TXT).

Export quizzes as PDF/JSON.

Add timed quiz mode with scoring.

🤝 Contributing
Pull requests are welcome!
Please fork the repository and submit a PR with your changes.
