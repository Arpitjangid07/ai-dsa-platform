import React from "react";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

const mockLeaderboard = [
  { name: "Arjun", xp: 950 },
  { name: "Meera", xp: 880 },
  { name: "Ravi", xp: 820 },
  { name: "Simran", xp: 790 },
  { name: "Ishan", xp: 750 },
];

export default function Leaderboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-2">
        <Trophy className="text-yellow-500" />
        Leaderboard
      </h1>

      <div className="bg-white shadow rounded-2xl overflow-hidden">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">XP</th>
            </tr>
          </thead>
          <tbody>
            {mockLeaderboard.map((user, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b"
              >
                <td className="px-4 py-3 font-medium">{index + 1}</td>
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3 font-semibold text-indigo-600">
                  {user.xp} XP
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
