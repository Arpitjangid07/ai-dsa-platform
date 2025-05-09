// src/pages/Rewards.jsx
import React from 'react';

const mockRewards = [
  { id: 1, name: 'Daily Streak Badge', description: 'Earned for 3-day streak', unlocked: true },
  { id: 2, name: 'Quiz Master', description: 'Score 100% in a quiz', unlocked: false },
  { id: 3, name: 'Topic Explorer', description: 'Complete 5 topics', unlocked: true },
];

export default function Rewards() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🏆 Rewards</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mockRewards.map((reward) => (
            <div
              key={reward.id}
              className={`p-6 rounded-2xl shadow-md transition ${
                reward.unlocked
                  ? 'bg-green-600 text-white'
                  : 'bg-slate-700 text-slate-300 opacity-50'
              }`}
            >
              <h2 className="text-xl font-semibold mb-2">{reward.name}</h2>
              <p className="text-sm">{reward.description}</p>
              <p className="mt-4 font-bold">
                {reward.unlocked ? 'Unlocked ✅' : 'Locked 🔒'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
