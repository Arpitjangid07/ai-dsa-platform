import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../context/OnboardingContext';

const goalsList = [
  'Crack Coding Interviews',
  'Learn Web Development',
  'Master Data Structures',
  'Improve Problem Solving',
  'Prepare for Contests'
];

export default function LearningGoals() {
  const [selectedGoals, setSelectedGoals] = useState([]);
  const { updateOnboarding } = useOnboarding();
  const navigate = useNavigate();

  const toggleGoal = (goal) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleNext = () => {
    if (selectedGoals.length === 0) return alert('Please select at least one goal');
    updateOnboarding({ learningGoals: selectedGoals });
    navigate('/onboarding/ready');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">What's Your Learning Goal?</h1>
      <div className="grid grid-cols-1 gap-3 w-full max-w-md">
        {goalsList.map((goal) => (
          <button
            key={goal}
            onClick={() => toggleGoal(goal)}
            className={`p-3 rounded-lg border text-left transition ${
              selectedGoals.includes(goal)
                ? 'bg-blue-600 text-white border-blue-700'
                : 'bg-white text-black'
            }`}
          >
            {goal}
          </button>
        ))}
      </div>
      <button
        onClick={handleNext}
        className="mt-6 px-6 py-3 bg-green-600 rounded hover:bg-green-700"
      >
        Next
      </button>
    </div>
  );
}
