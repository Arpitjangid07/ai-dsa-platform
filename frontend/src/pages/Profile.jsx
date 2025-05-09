// src/pages/Profile.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [editing, setEditing] = useState(false);

  const xp = user?.xp || 0;
  const level = Math.floor(xp / 100);

  const handleSave = () => {
    const updatedUser = { ...user, name };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
      <div className="max-w-xl mx-auto bg-slate-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">👤 Profile</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Name</label>
            {editing ? (
              <input
                className="w-full p-2 rounded-lg bg-slate-700 text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <p className="text-lg">{user?.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Email</label>
            <p className="text-lg">{user?.email}</p>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Level</label>
            <p className="text-lg">Level {level}</p>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Total XP</label>
            <p className="text-lg">{xp}</p>
          </div>

          <div className="pt-4">
            {editing ? (
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
