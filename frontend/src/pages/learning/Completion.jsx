import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaTrophy, FaStar, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Completion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, totalPuzzles, completedPuzzles } = location.state || {
    score: 0,
    totalPuzzles: 0,
    completedPuzzles: 0
  };

  const accuracy = totalPuzzles > 0 ? Math.round((completedPuzzles / totalPuzzles) * 100) : 0;
  const stars = Math.min(5, Math.floor(accuracy / 20) + 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <FaTrophy className="w-16 h-16 mx-auto mb-4" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-2">Congratulations!</h1>
            <p className="text-lg opacity-90">You've completed the puzzle journey</p>
          </div>

          {/* Results */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="text-gray-600 mb-2">Score</h3>
                <p className="text-2xl font-bold text-indigo-600">{score}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="text-gray-600 mb-2">Accuracy</h3>
                <p className="text-2xl font-bold text-indigo-600">{accuracy}%</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="text-gray-600 mb-2">Completed</h3>
                <p className="text-2xl font-bold text-indigo-600">
                  {completedPuzzles}/{totalPuzzles}
                </p>
              </div>
            </div>

            {/* Stars */}
            <div className="flex justify-center mb-8">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`w-8 h-8 ${
                    index < stars ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Feedback */}
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {accuracy >= 80
                  ? "Excellent Work!"
                  : accuracy >= 60
                  ? "Good Job!"
                  : "Keep Practicing!"}
              </h2>
              <p className="text-gray-600">
                {accuracy >= 80
                  ? "You've mastered this topic! Ready for the next challenge?"
                  : accuracy >= 60
                  ? "You're making great progress! A few more attempts will make you perfect."
                  : "Don't worry! Practice makes perfect. Try again to improve your score."}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate('/learn')}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
              >
                Continue Learning
                <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Completion;
