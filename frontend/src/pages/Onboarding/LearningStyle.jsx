import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../context/OnboardingContext';

export default function LearningStyle() {
  const [style, setStyle] = useState('');
  const { updateOnboarding } = useOnboarding();
  const navigate = useNavigate();

  const handleNext = () => {
    if (!style) return alert('Please choose a style');
    updateOnboarding({ learningStyle: style });
    navigate('/onboarding/level');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Choose Your Learning Style</h1>
      <div className="space-y-3">
        {['Visual', 'Auditory', 'Hands-on'].map((option) => (
          <button
            key={option}
            onClick={() => setStyle(option)}
            className={`px-4 py-2 rounded border ${
              style === option ? 'bg-blue-600 text-white' : 'bg-white text-black'
            }`}
          >
            {option}
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
