import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaBook, FaCode, FaVideo, FaTasks, FaCheck, FaLock, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

// Simulated static data for topics
const mockTopics = [
  {
    _id: "1",
    title: "Introduction to Data Structures",
    description:
      "Learn the basics of data structures including arrays, stacks, and linked lists. Master fundamental concepts and their real-world applications.",
    difficulty: "Beginner",
    estimatedTime: "2 hours",
    prerequisites: ["Basic Programming", "Variables & Loops"],
    details: [
      {
        heading: "What is a Data Structure?",
        content:
          "A data structure is a way of organizing and storing data efficiently. It enables efficient access and modification of data.",
        resources: [
          { type: "video", title: "Introduction to Data Structures", duration: "15 min" },
          { type: "article", title: "Understanding Data Structures", readTime: "10 min" },
        ],
      },
      {
        heading: "Types of Data Structures",
        content:
          "Linear structures (like arrays, linked lists) and non-linear structures (like trees, graphs). Each type has its specific use cases and advantages.",
        resources: [
          { type: "video", title: "Linear vs Non-linear Structures", duration: "20 min" },
          { type: "article", title: "Choosing the Right Data Structure", readTime: "15 min" },
        ],
      },
      {
        heading: "Why Learn Data Structures?",
        content:
          "They help optimize code performance and solve complex problems efficiently. Understanding data structures is crucial for writing efficient algorithms.",
        resources: [
          { type: "video", title: "Real-world Applications", duration: "25 min" },
          { type: "article", title: "Performance Optimization", readTime: "12 min" },
        ],
      },
    ],
    puzzles: [
      { type: "Fill-in-the-code", difficulty: "Easy", points: 100 },
      { type: "Bug Hunt", difficulty: "Medium", points: 200 },
      { type: "Order the Steps", difficulty: "Easy", points: 150 },
      { type: "Concept Matching", difficulty: "Medium", points: 200 },
      { type: "Mini Challenges", difficulty: "Hard", points: 300 },
    ],
    progress: {
      completed: 2,
      total: 5,
      currentPuzzle: 3,
    },
  },
];

const TopicDetails = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const foundTopic = mockTopics.find((t) => t._id === topicId);
    if (foundTopic) {
      setTopic(foundTopic);
    } else {
      setError("Topic not found");
    }
    setLoading(false);
  }, [topicId]);

  const handleStartPuzzles = () => {
    navigate(`/learn/puzzle-journey/${topicId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center text-red-500 font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-4">{topic.title}</h1>
              <p className="text-lg opacity-90">{topic.description}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm mb-2">
                {topic.difficulty}
              </span>
              <span className="text-sm opacity-90">{topic.estimatedTime}</span>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Progress</h3>
              <p className="text-sm text-gray-600">
                {topic.progress.completed} of {topic.progress.total} puzzles completed
              </p>
            </div>
            <div className="w-1/2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full"
                  style={{
                    width: `${(topic.progress.completed / topic.progress.total) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b">
          <div className="flex space-x-4 px-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-2 font-medium ${
                activeTab === "overview"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("resources")}
              className={`py-4 px-2 font-medium ${
                activeTab === "resources"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Resources
            </button>
            <button
              onClick={() => setActiveTab("puzzles")}
              className={`py-4 px-2 font-medium ${
                activeTab === "puzzles"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Puzzles
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-8">
              {topic.details.map((detail, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 p-6 rounded-lg"
                >
                  <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
                    {detail.heading}
                  </h2>
                  <p className="text-gray-700 mb-4">{detail.content}</p>
                  <div className="flex flex-wrap gap-4">
                    {detail.resources.map((resource, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-2 text-sm text-gray-600"
                      >
                        {resource.type === "video" ? (
                          <FaVideo className="text-red-500" />
                        ) : (
                          <FaBook className="text-blue-500" />
                        )}
                        <span>{resource.title}</span>
                        <span className="text-gray-400">
                          • {resource.duration || resource.readTime}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "puzzles" && (
            <div className="space-y-4">
              {topic.puzzles.map((puzzle, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    index < topic.progress.currentPuzzle
                      ? "bg-green-50"
                      : index === topic.progress.currentPuzzle
                      ? "bg-indigo-50"
                      : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {index < topic.progress.currentPuzzle ? (
                      <FaCheck className="text-green-500 text-xl" />
                    ) : index === topic.progress.currentPuzzle ? (
                      <FaTasks className="text-indigo-500 text-xl" />
                    ) : (
                      <FaLock className="text-gray-400 text-xl" />
                    )}
                    <div>
                      <h3 className="font-medium text-gray-800">{puzzle.type}</h3>
                      <p className="text-sm text-gray-600">
                        {puzzle.difficulty} • {puzzle.points} points
                      </p>
                    </div>
                  </div>
                  {index === topic.progress.currentPuzzle && (
                    <button
                      onClick={handleStartPuzzles}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
                    >
                      Start Puzzle Journey
                      <FaArrowRight className="ml-2" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t">
          <div className="flex justify-between">
            <button
              onClick={() => navigate("/learn")}
              className="px-6 py-2 text-gray-600 hover:text-gray-800"
            >
              Back to Topics
            </button>
            <button
              onClick={handleStartPuzzles}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              Start Puzzle Journey
              <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicDetails;
