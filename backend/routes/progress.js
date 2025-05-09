const express = require('express');
const router = express.Router();
const UserProgress = require('../models/UserProgress');

// @route   POST /api/progress/update
// @desc    Create or update user progress
// @access  Public (you can add auth middleware later)
router.post('/update', async (req, res) => {
  try {
    const { userId, progress } = req.body;

    // Check if both userId and progress are provided
    if (!userId || !progress) {
      return res.status(400).json({ message: 'userId and progress are required.' });
    }

    // Find and update progress OR create if it doesn't exist
    const updatedProgress = await UserProgress.findOneAndUpdate(
      { userId }, // Find by userId
      { progress }, // Update the progress
      { upsert: true, new: true, setDefaultsOnInsert: true } // Options: create new if not exists
    );

    res.json(updatedProgress);
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ message: 'Server error while updating progress.' });
  }
});

// @route   GET /api/progress/:userId
// @desc    Get user progress
// @access  Public (you can add auth middleware later)
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const userProgress = await UserProgress.findOne({ userId });

    if (!userProgress) {
      return res.status(404).json({ message: 'Progress not found for this user.' });
    }

    res.json(userProgress);
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ message: 'Server error while fetching progress.' });
  }
});

module.exports = router;
