// src/api/topics.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/topics'; // Ensure the correct API URL

// Fetch all topics
export const fetchTopics = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch a specific topic by ID
export const fetchTopicById = async (topicId) => {
  const response = await axios.get(`${API_URL}/${topicId}`);
  return response.data;
};
