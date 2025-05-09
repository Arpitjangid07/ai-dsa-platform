// src/components/XPBar.jsx
import React from 'react';

export default function XPBar({ xp }) {
  const level = Math.floor(xp / 100);
  const currentXP = xp % 100;

  return (
    <div className="mb-4">
      <p className="text-sm font-medium mb-1">Level {level}</p>
      <div className="w-full bg-slate-700 rounded-full h-4">
        <div
          className="bg-green-500 h-4 rounded-full transition-all duration-300"
          style={{ width: `${currentXP}%` }}
        />
      </div>
      <p className="text-xs mt-1 text-slate-400">{currentXP}/100 XP</p>
    </div>
  );
}
