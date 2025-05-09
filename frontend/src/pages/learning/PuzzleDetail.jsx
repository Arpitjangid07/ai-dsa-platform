import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const PuzzleJourney = () => {
  const { topicId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { puzzles, currentIndex } = location.state || {};

  if (!puzzles || currentIndex === undefined) {
    return (
      <div className="text-center text-red-500 py-20">
        Invalid puzzle journey. Please go back.
      </div>
    );
  }

  const currentPuzzle = puzzles[currentIndex];

  const handleNext = () => {
    if (currentIndex + 1 < puzzles.length) {
      navigate(`/learn/${topicId}/puzzles/start`, {
        state: { puzzles, currentIndex: currentIndex + 1 },
      });
    } else {
      navigate(`/learn/${topicId}/completion`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-6 bg-white shadow-xl rounded-2xl text-center">
      <h1 className="text-3xl font-bold text-indigo-700 mb-8">
        {currentPuzzle.type}
      </h1>
      <p className="text-gray-600 mb-10">Solve this puzzle to move forward!</p>

      <button
        onClick={handleNext}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105"
      >
        {currentIndex + 1 < puzzles.length ? "Next Puzzle" : "Finish"}
      </button>
    </div>
  );
};

export default PuzzleJourney;
