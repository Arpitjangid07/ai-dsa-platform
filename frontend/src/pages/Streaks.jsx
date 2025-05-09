import React from "react";
import { Flame } from "lucide-react";
import { motion } from "framer-motion";

const streakData = {
  currentStreak: 5,
  longestStreak: 12,
  lastActive: "2025-04-10",
};

export default function Streaks() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-orange-600 flex items-center gap-2">
        <Flame className="text-red-500" />
        Your Streaks
      </h1>

      <div className="grid sm:grid-cols-2 gap-6">
        <motion.div
          className="bg-white rounded-2xl shadow p-6 space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-lg font-semibold text-gray-700">🔥 Current Streak</h2>
          <p className="text-3xl font-bold text-orange-600">{streakData.currentStreak} days</p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow p-6 space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold text-gray-700">🏆 Longest Streak</h2>
          <p className="text-3xl font-bold text-green-600">{streakData.longestStreak} days</p>
        </motion.div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 border mt-4 text-sm text-gray-600">
        Last active: <span className="font-semibold">{streakData.lastActive}</span>
      </div>
    </div>
  );
}
