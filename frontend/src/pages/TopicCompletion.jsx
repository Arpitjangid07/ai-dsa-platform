// src/pages/TopicCompletion.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sparkles, Star, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function TopicCompletion() {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const earnedXP = 100;
  const stars = 3;
  const badges = ["Stack Pro"];

  const nextTopic = "queues"; // can be dynamic later

  return (
    <div className="max-w-2xl mx-auto text-center py-12 px-4 bg-white shadow-xl rounded-2xl">
      {/* Celebration */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-green-600 flex items-center justify-center gap-2">
          <Sparkles className="text-yellow-400" size={28} />
          Topic Mastered!
        </h1>
        <p className="text-gray-600 mt-2">You've completed all puzzles for <span className="font-semibold">{topicId}</span>.</p>
      </motion.div>

      {/* XP and Stars */}
      <div className="mt-8 flex flex-col items-center space-y-4">
        <div className="text-lg font-medium text-indigo-600">
          🎯 XP Earned: <span className="font-bold">{earnedXP}</span>
        </div>

        <div className="flex space-x-2">
          {Array.from({ length: stars }).map((_, i) => (
            <Star key={i} className="text-yellow-400 w-6 h-6" fill="#facc15" />
          ))}
        </div>

        {/* Badges */}
        <div className="flex items-center justify-center gap-2 text-sm mt-2">
          {badges.map((badge, idx) => (
            <span
              key={idx}
              className="inline-flex items-center bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-medium"
            >
              <BadgeCheck className="w-4 h-4 mr-1" />
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => navigate("/learn")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded-lg"
        >
          Back to Topics
        </button>
        <button
          onClick={() => navigate(`/learn/${nextTopic}`)}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg"
        >
          Next Topic: {nextTopic.charAt(0).toUpperCase() + nextTopic.slice(1)} →
        </button>
      </div>
    </div>
  );
}
