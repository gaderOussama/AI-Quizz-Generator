import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const About = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-dark/80 rounded-xl shadow-lg text-white">
      <h1 className="text-4xl font-bold mb-4 text-purple-400">AI Quiz Generator</h1>
      <p className="mb-6 text-lg">
        Welcome to the AI Quiz Generator! This application allows you to generate multiple-choice quizzes from your own PDF or CSV files, or custom text, using advanced AI models. Perfect for students, teachers, and lifelong learners.
      </p>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-purple-300">Technologies Used</h2>
        <ul className="list-disc list-inside text-gray-300">
          <li>React & Vite</li>
          <li>Tailwind CSS</li>
          <li>Framer Motion</li>
          <li>Node.js & Express</li>
          <li>Python (LangGraph, Groq, PyMuPDF, Pandas)</li>
        </ul>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2 text-purple-300">Creator</h2>
        <div className="flex items-center gap-4">
          <span className="font-bold text-lg">Oussama Gader</span>
          <a href="https://github.com/gaderOussama" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400">
            <FaGithub size={28} />
          </a>
          <a href="https://www.linkedin.com/in/oussama-gader-46763230b/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400">
            <FaLinkedin size={28} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;