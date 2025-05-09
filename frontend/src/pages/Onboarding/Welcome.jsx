import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to CodeQuest 🚀</h1>
      <p className="text-lg mb-8">Your gamified journey to mastering DSA begins here!</p>
      <button
        onClick={() => navigate('/onboarding/experience')}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-semibold transition"
      >
        Get Started
      </button>
    </div>
  );
}
