// src/pages/learning/TopicsOverview.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaBook, FaTasks, FaChalkboardTeacher, FaCode, FaStar, FaLock, FaCheck, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

const TopicsOverview = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [userProgress, setUserProgress] = useState({});

  useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true);
      try {
        // Simulating initial data load with enhanced content
        const initialData = [
          {
            _id: "1",
            title: "Introduction to Data Structures",
            description: "Learn the basics of data structures and their applications in real-world problems.",
            difficulty: "Beginner",
            estimatedTime: "2 hours",
            category: "Data Structures",
            progress: 0,
            subTopics: [
              { name: "Arrays", icon: <FaCode />, completed: false },
              { name: "Linked Lists", icon: <FaTasks />, completed: false },
              { name: "Stacks", icon: <FaChalkboardTeacher />, completed: false },
            ],
          },
          {
            _id: "2",
            title: "Algorithms 101",
            description: "Master fundamental algorithms and their implementation in various programming languages.",
            difficulty: "Intermediate",
            estimatedTime: "3 hours",
            category: "Algorithms",
            progress: 0,
            subTopics: [
              { name: "Sorting", icon: <FaBook />, completed: false },
              { name: "Searching", icon: <FaCode />, completed: false },
            ],
          },
        ];
        setTopics(initialData);
      } catch (err) {
        setError("Failed to load topics");
        console.error("Error loading topics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const filteredTopics = topics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", "Data Structures", "Algorithms", "Web Development", "Database"];

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">
          📚 Your Learning Journey
        </h1>
        <p className="text-gray-600 text-lg">
          Explore topics, track your progress, and enhance your coding skills
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="w-full md:w-1/2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map((topic) => (
          <motion.div
            key={topic._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-800">{topic.title}</h2>
                <span className="px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-700">
                  {topic.difficulty}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{topic.description}</p>
              
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <FaClock className="mr-1" />
                <span>{topic.estimatedTime}</span>
                <span className="mx-2">•</span>
                <FaBook className="mr-1" />
                <span>{topic.category}</span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{ width: `${topic.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">{topic.progress}% Complete</p>
              </div>

              {/* Subtopics */}
              <div className="space-y-2 mb-4">
                {topic.subTopics.map((subTopic, index) => (
                  <div key={index} className="flex items-center">
                    {subTopic.completed ? (
                      <FaCheck className="text-green-500 mr-2" />
                    ) : (
                      <FaLock className="text-gray-400 mr-2" />
                    )}
                    <span className="text-gray-700">{subTopic.name}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate(`/learn/${topic._id}`)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Start Learning
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default TopicsOverview;
