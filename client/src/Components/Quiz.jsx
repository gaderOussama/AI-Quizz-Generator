import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Quiz = () => {
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [quiz, setQuiz] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    const textarea = textareaRef.current;
    setValue(e.target.value);

    // Auto resize textarea
    textarea.style.height = "auto";
    const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight);
    const maxHeight = lineHeight * 3 + 8;
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleGenerate = async () => {
    setError("");
    setQuiz([]);
    setCurrent(0);
    setSelected(null);
    setShowAnswer(false);
    if (!file && !value.trim()) {
      setError("Please provide either a PDF file or some text.");
      return;
    }

    setLoading(true);
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("difficulty", "medium");
        formData.append("num_questions", 5);

        const res = await axios.post(
          "http://localhost:5001/api/quiz/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setQuiz(res.data.questions || []);
      } else {
        const res = await axios.post("http://localhost:5000/api/quiz/upload", {
          text: value,
          difficulty: "medium",
          num_questions: 5,
        });
        setQuiz(res.data.questions || []);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to generate quiz.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center text-white">
      <div className="flex justify-center text-start items-center p-2 h-1/5 w-4/5">
        <h1 className="text-3xl font-bold font-mono">Generate your quiz with AI</h1>
      </div>

      <div className="flex flex-col p-8 bg-purple/70 rounded-xl w-4/5 h-2/4 overflow-y-auto">
        {loading ? (
          <p>Generating quiz...</p>
        ) : quiz.length > 0 ? (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <p className="font-semibold mb-4">{current + 1}. {quiz[current].question}</p>
                <ul className="flex flex-col gap-2">
                  {quiz[current].choices?.map((choice, cIdx) => {
                    let choiceClass = "px-4 py-2 rounded-lg cursor-pointer border border-gray-600 ";
                    if (selected !== null) {
                      if (cIdx === selected && selected === quiz[current].answer) {
                        choiceClass += " bg-green-600 text-white";
                      } else if (cIdx === selected && selected !== quiz[current].answer) {
                        choiceClass += " bg-red-600 text-white";
                      } else if (showAnswer && cIdx === quiz[current].answer) {
                        choiceClass += " bg-green-600 text-white";
                      } else {
                        choiceClass += " bg-dark/40 text-white";
                      }
                    } else {
                      choiceClass += " bg-dark/40 hover:bg-purple-800 text-white";
                    }
                    return (
                      <motion.li
                        key={cIdx}
                        className={choiceClass}
                        onClick={() => {
                          if (selected === null) {
                            setSelected(cIdx);
                            if (cIdx === quiz[current].answer) {
                              setTimeout(() => {
                                setSelected(null);
                                setShowAnswer(false);
                                setCurrent((prev) => prev + 1);
                              }, 1000);
                            } else {
                              setShowAnswer(true);
                            }
                          }
                        }}
                        style={{ pointerEvents: selected !== null ? "none" : "auto" }}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {choice}
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.div>
            </AnimatePresence>
            {showAnswer && (
              <>
                <p className="text-sm text-gray-300 mt-2">Explanation: {quiz[current].explanation}</p>
                <button
                  className="mt-3 bg-light2 text-dark px-4 py-2 rounded-full font-semibold hover:opacity-90"
                  onClick={() => {
                    setSelected(null);
                    setShowAnswer(false);
                    setCurrent((prev) => prev + 1);
                  }}
                >
                  Next Question
                </button>
              </>
            )}
            {current >= quiz.length && (
              <p className="text-green-400 font-bold mt-4">Quiz complete!</p>
            )}
          </>
        ) : (
          <p className="text-gray-300">Your quiz will appear here...</p>
        )}
      </div>

      <div className="flex flex-col gap-3 w-4/5 mt-4">
        <textarea
          ref={textareaRef}
          placeholder="Enter your text here..."
          value={value}
          onChange={handleChange}
          rows={1}
          className="bg-dark resize-none text-white rounded-2xl px-4 py-2 focus:outline-none placeholder:text-gray-400 text-sm w-full overflow-y-auto"
          style={{
            minHeight: "2.5rem",
            maxHeight: "6.5rem",
          }}
        />
        <input
          type="file"
          accept="application/pdf"
          className="block w-fit text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gradient-to-b file:from-light2 file:to-light file:text-white file:font-semibold file:cursor-pointer"
          onChange={handleFileChange}
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          onClick={handleGenerate}
          className="bg-gradient-to-r from-light2 to-light px-4 py-2 rounded-full font-semibold hover:opacity-90"
        >
          Generate Quiz
        </button>
      </div>
    </div>
  );
};

export default Quiz;
