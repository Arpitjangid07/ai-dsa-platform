// src/components/puzzles/FillInTheCode.jsx

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FillInTheCode = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  
  const [code, setCode] = useState("");

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = () => {
    // Simulate checking if the code is correct
    console.log("Code submitted:", code);
    // Navigate to next step or show feedback
    navigate(`/learn/${topicId}/puzzles`);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 bg-white shadow-md rounded-2xl">
      <h1 className="text-4xl font-bold text-indigo-700 mb-6">Fill in the Code</h1>
      <p className="text-gray-700 mb-4">Complete the following code:</p>
      
      <pre className="bg-gray-100 p-4 rounded-lg text-sm">
        function add(a, b) {"{"}
          <br />
        <span className="text-gray-500">  // Your code here</span>
        <br />
        return a + b;
        <br />
        {"}"}
      </pre>
      
      <textarea
        value={code}
        onChange={handleCodeChange}
        rows={5}
        className="w-full mt-4 p-4 border border-gray-300 rounded-lg"
        placeholder="Type your solution here..."
      />
      
      <button
        onClick={handleSubmit}
        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg mt-6"
      >
        Submit Code
      </button>
    </div>
  );
};

export default FillInTheCode;
