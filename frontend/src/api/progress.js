// progress.js (client-side code)
import axios from 'axios';

export const updateUserProgress = async (progressData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/progress', progressData);
    console.log('Progress updated:', response.data);
  } catch (error) {
    console.error('Failed to update progress:', error);
  }
};
