import React from 'react';

const UserProgress = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
      <div className="space-y-2">
        <div className="bg-white rounded-xl shadow p-4">Data Structures: 60% complete</div>
        <div className="bg-white rounded-xl shadow p-4">Algorithms: 40% complete</div>
        <div className="bg-white rounded-xl shadow p-4">Recursion: 75% complete</div>
      </div>
    </div>
  );
};

export default UserProgress;
