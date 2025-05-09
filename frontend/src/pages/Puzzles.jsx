// src/pages/Puzzles.jsx
import React from "react";
import { useParams } from "react-router-dom";

const Puzzles = () => {
  const { topicId } = useParams();
  
  // Simulated data (replace this with actual topic data)
  const puzzles = [
    { type: "Fill-in-the-code", description: "Complete the missing code." },
    { type: "Bug Hunt", description: "Identify and fix bugs." },
    { type: "Order the Steps", description: "Arrange steps in the correct order." },
    { type: "Concept Matching", description: "Match terms to their definitions." },
    { type: "Mini Challenges", description: "Solve small challenges." }
  ];

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 bg-white shadow-md rounded-2xl">
      <h1 className="text-4xl font-bold text-indigo-700 mb-6">Puzzles for Topic {topicId}</h1>
      
      {/* Loop through puzzles */}
      <div className="space-y-6">
        {puzzles.map((puzzle, index) => (
          <div key={index} className="flex flex-col items-start space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">{puzzle.type}</h3>
            <p className="text-gray-600">{puzzle.description}</p>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              Start {puzzle.type}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Puzzles;
