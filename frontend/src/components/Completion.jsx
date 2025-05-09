import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserProgress } from "../api/progress";

export default function Completion({ topicId }) {
  const navigate = useNavigate();

  useEffect(() => {
    const completeTopic = async () => {
      try {
        // Update user progress after completing the topic
        await updateUserProgress({
          topicId,
          status: "completed",
        });
        console.log("Topic completed successfully!");
      } catch (error) {
        console.error("Error updating progress:", error);
      }
    };

    completeTopic();
  }, [topicId]);

  const handleGoToLeaderboard = () => {
    navigate("/leaderboard");
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6">🎉 Topic Complete!</h2>
      <p className="text-xl text-gray-700 mb-4">
        Congratulations! You've completed all the puzzles for this topic.
      </p>
      <button
        onClick={handleGoToLeaderboard}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition"
      >
        Go to Leaderboard
      </button>
    </div>
  );
}
