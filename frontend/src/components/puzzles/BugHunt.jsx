// src/components/puzzles/BugHunt.jsx

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BugHunt = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const [bugFixed, setBugFixed] = useState(false);

  const handleFixBug = () => {
    setBugFixed(true);
  };

  const handleNext = () => {
    // Simulate checking if the bug is fixed
    console.log("Bug fixed:", bugFixed);
    navigate(`/learn/${topicId}/puzzles`);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 bg-white shadow-md rounded-2xl">
      <h1 className="text-4xl font-bold text-indigo-700 mb-6">Bug Hunt</h1>
      <p className="text-gray-700 mb-4">
        Look at the following code and identify the bug.
      </p>

      <pre className="bg-gray-100 p-4 rounded-lg text-sm">
        const nums = [1, 2, 3, 4];
        <br />
        console.log(nums[5]); // This line has a bug
      </pre>

      <button
        onClick={handleFixBug}
        className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-6 rounded-lg mt-6"
      >
        Fix the Bug
      </button>

      {bugFixed && (
        <div className="mt-4 text-green-500">Bug fixed! Great job.</div>
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

export default BugHunt;
