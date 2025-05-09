import React from "react";
import { Award, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const mockAchievements = [
  {
    title: "First Win!",
    description: "Completed your first quiz",
    icon: <CheckCircle className="text-green-500" size={24} />,
  },
  {
    title: "5-Day Streak 🔥",
    description: "Practiced 5 days in a row",
    icon: <Award className="text-orange-500" size={24} />,
  },
  {
    title: "100 XP Earned",
    description: "Earned 100 XP through quizzes",
    icon: <Award className="text-blue-500" size={24} />,
  },
];

export default function Achievements() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-indigo-700">Achievements</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockAchievements.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow p-4 flex items-start space-x-4"
          >
            <div className="p-2 bg-gray-100 rounded-full">
              {achievement.icon}
            </div>
            <div>
              <h2 className="font-semibold text-lg">{achievement.title}</h2>
              <p className="text-gray-500 text-sm">{achievement.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
