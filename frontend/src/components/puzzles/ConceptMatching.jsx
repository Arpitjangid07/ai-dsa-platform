// src/components/puzzles/ConceptMatching.jsx

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ConceptMatching = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const [matched, setMatched] = useState(false);

  const handleMatch = () => {
    setMatched(true);
  };

  const handleNext = () => {
    navigate(`/learn/${topicId}/puzzles`);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 bg-white shadow-md rounded-2xl">
      <h1 className="text-4xl font-bold text-indigo-700 mb-6">Concept Matching</h1>
      <p className="text-gray-700 mb-4">Match the following terms with their definitions:</p>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-semibold">Array</span>
          <span className="italic">A collection of items stored at contiguous memory locations</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Linked List</span>
          <span className="italic">A linear data structure where each element points to the next</span>
        </div>
      </div>

      <button
        onClick={handleMatch}
        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg mt-6"
      >
        Check Match
      </button>

      {matched && (
        <div className="mt-4 text-green-500">Great! You've made the correct match.</div>
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

export default ConceptMatching;
