// src/components/QuizSummary.jsx

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const QuizSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score } = location.state || { score: 0 };

  const handleRetry = () => {
    navigate("/learn");
  };

  return (
    <div className="max-w-lg mx-auto py-6 px-4 text-center">
      <h2 className="text-3xl font-bold text-indigo-700 mb-4">Quiz Summary</h2>
      <p className="text-xl mb-6">Your final score: {score}</p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleRetry}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
        >
          Retry Quiz
        </button>
        <button
          onClick={() => navigate("/learn")}
          className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
        >
          Go Back to Topics
        </button>
      </div>
    </div>
  );
};

export default QuizSummary;
