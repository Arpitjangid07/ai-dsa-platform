// src/components/TopicQuiz.jsx

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Simulated quiz data
const mockQuiz = [
  {
    question: "What is a stack?",
    options: ["A LIFO structure", "A FIFO structure", "A tree structure", "None of the above"],
    answer: "A LIFO structure",
  },
  {
    question: "What is the time complexity of binary search?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    answer: "O(log n)",
  },
  {
    question: "Which of the following is a sorting algorithm?",
    options: ["Bubble Sort", "Merge Sort", "Quick Sort", "All of the above"],
    answer: "All of the above",
  },
];

const TopicQuiz = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer === mockQuiz[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion < mockQuiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleFinishQuiz = () => {
    navigate(`/learn/${topicId}/quiz/summary`, {
      state: { score },
    });
  };

  if (quizCompleted) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Quiz Completed!</h2>
        <p>Your score: {score} / {mockQuiz.length}</p>
        <button
          onClick={handleFinishQuiz}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
        >
          View Summary
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto py-6 px-4">
      <h2 className="text-2xl font-semibold">{mockQuiz[currentQuestion].question}</h2>
      <div className="mt-4">
        {mockQuiz[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            className={`w-full p-3 mb-3 border rounded-lg ${
              selectedAnswer === option ? "bg-indigo-600 text-white" : "bg-white text-indigo-600"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={handleNext}
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded mt-4"
      >
        Next Question
      </button>
    </div>
  );
};

export default TopicQuiz;
