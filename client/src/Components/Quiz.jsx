import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FaFileUpload, FaFilePdf, FaFileCsv } from "react-icons/fa";

const Quiz = () => {
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [quiz, setQuiz] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [numQuestions, setNumQuestions] = useState(5);
  const textareaRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const getFileIcon = (type) => {
    if (type.includes("pdf")) return <FaFilePdf className="text-red-500 text-3xl" />;
    if (type.includes("csv")) return <FaFileCsv className="text-green-500 text-3xl" />;
    return <FaFileUpload className="text-gray-400 text-3xl" />;
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
        formData.append("difficulty", difficulty);
        formData.append("num_questions", numQuestions);

        const res = await axios.post(
          "http://localhost:5001/api/quiz/upload",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setQuiz(res.data.questions || []);
      } else {
        const res = await axios.post("http://localhost:5000/api/quiz/upload", {
          text: value,
          difficulty,
          num_questions: numQuestions,
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
        <h1 className="text-3xl font-bold font-mono">Generate your Quiz with AI</h1>
      </div>

      <div className="flex flex-col p-8 bg-purple/70 rounded-xl w-4/5 h-2/4 overflow-y-auto">
        {loading ? (
          <p>Generating quiz...</p>
        ) : quiz.length > 0 ? (
          <>
            {current < quiz.length ? (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="font-semibold mb-4">
                      {current + 1}. {quiz[current].question}
                    </p>
                    <ul className="flex flex-col gap-2">
                      {quiz[current].choices?.map((choice, cIdx) => {
                        let choiceClass =
                          "px-4 py-2 rounded-lg cursor-pointer border border-gray-600 ";
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
                    <p className="text-sm text-gray-300 mt-2">
                      Explanation: {quiz[current].explanation}
                    </p>
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
              </>
            ) : (
              <p className="text-green-400 font-bold mt-4">Quiz complete!</p>
            )}
          </>
        ) : (
          <div></div>
        )}
      </div>

      <div className="flex flex-col gap-3 w-4/5 mt-4">
        
        <div className="flex flex-wrap gap-3 w-full">
          
          <div className="flex items-center justify-center flex-1 min-w-[200px]">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-lg cursor-pointer bg-dark/50 border-gray-600 hover:border-light transition"
            >
              {file ? (
                <div className="flex items-center space-x-3 px-4">
                  {getFileIcon(file.type)}
                  <span className="text-white text-sm truncate w-48">{file.name}</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <FaFileUpload className="text-gray-400 text-3xl mb-1" />
                  <p className="text-gray-300 text-sm">Click to upload PDF</p>
                </div>
              )}
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.csv"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          
          <div className="flex flex-col justify-center min-w-[150px]">
            <label className="text-sm text-gray-300 mb-1">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="bg-dark/50 border border-gray-600 rounded-lg p-2 text-white focus:outline-none"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          
          <div className="flex flex-col justify-center min-w-[150px]">
            <label className="text-sm text-gray-300 mb-1"># Questions</label>
            <input
              type="number"
              value={numQuestions}
              min="1"
              max="20"
              onChange={(e) => setNumQuestions(e.target.value)}
              className="bg-dark/50 border border-gray-600 rounded-lg p-2 text-white focus:outline-none"
            />
          </div>
        </div>

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
