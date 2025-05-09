import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { FaArrowLeft, FaCheck, FaLock, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';

const PuzzleJourney = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [puzzles, setPuzzles] = useState([]);
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [completedPuzzles, setCompletedPuzzles] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPuzzles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/puzzles/topic/${topicId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        // Validate that response.data is an array
        if (!Array.isArray(response.data)) {
          throw new Error('Invalid response format: expected an array of puzzles');
        }
        
        setPuzzles(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching puzzles:', err);
        setError(err.response?.data?.message || 'Failed to load puzzles');
        setLoading(false);
      }
    };

    fetchPuzzles();
  }, [topicId]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/puzzles/${puzzles[currentPuzzle]._id}/submit`, {
        answer: userAnswer
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setFeedback(response.data.message);
      
      if (response.data.isCorrect) {
        setCompletedPuzzles(prev => [...prev, currentPuzzle]);
        setScore(prev => prev + response.data.points);
        
        setTimeout(() => {
          if (currentPuzzle < puzzles.length - 1) {
            setCurrentPuzzle(prev => prev + 1);
            setUserAnswer('');
            setFeedback(null);
            setTimeLeft(300);
          } else {
            navigate('/learn/completion', { 
              state: { 
                score,
                totalPuzzles: puzzles.length,
                completedPuzzles: completedPuzzles.length + 1
              }
            });
          }
        }, 1500);
      }
    } catch (err) {
      setFeedback('Error submitting answer. Please try again.');
    }
  };

  const handleSkip = () => {
    if (currentPuzzle < puzzles.length - 1) {
      setCurrentPuzzle(prev => prev + 1);
      setUserAnswer('');
      setFeedback(null);
      setTimeLeft(300);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent border-solid rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading puzzles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!Array.isArray(puzzles) || puzzles.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No puzzles available for this topic.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const currentPuzzleData = puzzles[currentPuzzle];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 hover:opacity-80"
            >
              <FaArrowLeft />
              <span>Back</span>
            </button>
            <div className="text-center">
              <h1 className="text-2xl font-bold">Puzzle Journey</h1>
              <p className="text-sm opacity-90">Puzzle {currentPuzzle + 1} of {puzzles.length}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <FaStar className="text-yellow-400 mr-1" />
                <span>{score} points</span>
              </div>
              <div className="text-sm">
                Time: {formatTime(timeLeft)}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="p-4 bg-gray-50">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentPuzzle + 1) / puzzles.length) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            {puzzles.map((_, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index <= currentPuzzle ? 'text-indigo-600' : 'text-gray-400'
                }`}
              >
                {index < currentPuzzle ? (
                  <FaCheck className="mr-1" />
                ) : index === currentPuzzle ? (
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                ) : (
                  <FaLock className="mr-1" />
                )}
                <span>Puzzle {index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Puzzle Content */}
        <div className="p-6">
          <motion.div
            key={currentPuzzle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {currentPuzzleData.title}
            </h2>
            <p className="text-gray-600 mb-6">
              Difficulty: {currentPuzzleData.difficulty} • {currentPuzzleData.points} points
            </p>

            {/* Puzzle-specific content */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700 mb-4">{currentPuzzleData.description}</p>
              <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                {currentPuzzleData.content}
              </pre>
            </div>

            {/* Answer Input */}
            <div className="mb-6">
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer here..."
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
              />
            </div>

            {/* Feedback */}
            {feedback && (
              <div className={`p-4 rounded-lg mb-6 ${
                feedback.includes('Correct') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {feedback}
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between">
              <button
                onClick={() => setShowHint(!showHint)}
                className="px-4 py-2 text-indigo-600 hover:text-indigo-700"
              >
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
              <div className="flex space-x-4">
                <button
                  onClick={handleSkip}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Skip
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Submit
                </button>
              </div>
            </div>

            {/* Hint Section */}
            {showHint && currentPuzzleData.hints && currentPuzzleData.hints.length > 0 && (
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">Hint</h3>
                <p className="text-yellow-700">
                  {currentPuzzleData.hints[0].text}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PuzzleJourney;
