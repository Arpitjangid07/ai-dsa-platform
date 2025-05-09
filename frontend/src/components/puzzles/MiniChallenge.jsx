// src/components/puzzles/MiniChallenges.jsx

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MiniChallenges = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const [completed, setCompleted] = useState(false);

  const handleChallengeComplete = () => {
    setCompleted(true);
  };

  const handleNext = () => {
    navigate(`/learn/${topicId}/puzzles`);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 bg-white shadow-md rounded-2xl">
      <h1 className="text-4xl font-bold text-indigo-700 mb-6">Mini Challenges</h1>
      <p className="text-gray-700 mb-4">
        Complete the challenge by solving the problem:
      </p>

      <pre className="bg-gray-100 p-4 rounded-lg text-sm">
        {`function reverseArray(arr) {`}
        <br />
        {`  // Complete the function to reverse an array`}
        <br />
        {`  return arr.reverse();`}
        <br />
        {`}`}
      </pre>

      <button
        onClick={handleChallengeComplete}
        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg mt-6"
      >
        Complete Challenge
      </button>

      {completed && (
        <div className="mt-4 text-green-500">Challenge completed! Well done.</div>
      )}

      <button
        onClick={handleNext}
        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg mt-6"
      >
        Next Puzzle
      </button>
    </div>
  );
};

export default MiniChallenges;
