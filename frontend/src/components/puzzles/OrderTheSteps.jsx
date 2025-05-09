// src/components/puzzles/OrderTheSteps.jsx

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const OrderTheSteps = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const [steps, setSteps] = useState([
    "Step 3: Iterate through the array",
    "Step 1: Initialize an array",
    "Step 2: Loop through the array and modify values",
    "Step 4: Return the modified array",
  ]);
  
  const handleOrder = () => {
    const correctOrder = [
      "Step 1: Initialize an array",
      "Step 2: Loop through the array and modify values",
      "Step 3: Iterate through the array",
      "Step 4: Return the modified array",
    ];

    if (JSON.stringify(steps) === JSON.stringify(correctOrder)) {
      console.log("Correct order!");
      navigate(`/learn/${topicId}/puzzles`);
    } else {
      console.log("Incorrect order, try again!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 bg-white shadow-md rounded-2xl">
      <h1 className="text-4xl font-bold text-indigo-700 mb-6">Order the Steps</h1>
      <p className="text-gray-700 mb-4">Arrange the following steps in the correct order:</p>

      <ul className="space-y-4">
        {steps.map((step, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span className="bg-gray-100 p-2 rounded-md">{step}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleOrder}
        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg mt-6"
      >
        Submit Order
      </button>
    </div>
  );
};

export default OrderTheSteps;
