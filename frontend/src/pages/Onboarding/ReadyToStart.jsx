import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../context/OnboardingContext';

export default function ReadyToStart() {
  const { onboardingData } = useOnboarding();
  const navigate = useNavigate();

  const handleStart = () => {
    console.log('Final Onboarding Data:', onboardingData);
    // You can send this to the backend here if needed
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">You're All Set!</h1>

      <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md shadow-lg space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-1">Learning Style:</h2>
          <p>{onboardingData.learningStyle || 'Not selected'}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-1">Skill Level:</h2>
          <p>{onboardingData.skillLevel || 'Not selected'}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-1">Goals:</h2>
          <ul className="list-disc list-inside">
            {onboardingData.learningGoals?.length ? (
              onboardingData.learningGoals.map((goal, idx) => (
                <li key={idx}>{goal}</li>
              ))
            ) : (
              <li>Not selected</li>
            )}
          </ul>
        </div>
      </div>

      <button
        onClick={handleStart}
        className="mt-8 px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition"
      >
        Start Learning
      </button>
    </div>
  );
}
