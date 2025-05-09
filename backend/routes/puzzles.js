const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Topic = require("../models/Topic");
const Puzzle = require("../models/Puzzle");
const User = require("../models/User");
const auth = require('../middleware/auth');

// Get all puzzles for a topic
router.get('/topic/:topicId', auth, async (req, res) => {
  try {
    console.log('Fetching puzzles for topic:', req.params.topicId);
    
    // Convert topicId to ObjectId
    const topicId = new mongoose.Types.ObjectId(req.params.topicId);
    
    const puzzles = await Puzzle.find({ 
      topicId: topicId,
      isActive: true 
    }).sort('order');
    
    console.log('Found puzzles:', puzzles);
    
    if (!puzzles || !Array.isArray(puzzles)) {
      return res.status(200).json([]);
    }
    
    res.json(puzzles);
  } catch (error) {
    console.error('Error fetching puzzles:', error);
    res.status(500).json({ message: 'Error fetching puzzles' });
  }
});

// Get puzzles for a specific topic (deprecated, use /topic/:topicId instead)
router.get("/:topicId", async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.topicId).populate("puzzles");
    if (!topic) return res.status(404).json({ message: "Topic not found" });

    res.json(topic.puzzles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single puzzle
router.get('/puzzle/:id', auth, async (req, res) => {
  try {
    const puzzle = await Puzzle.findById(req.params.id);
    if (!puzzle) {
      return res.status(404).json({ message: 'Puzzle not found' });
    }
    res.json(puzzle);
  } catch (error) {
    console.error('Error fetching puzzle:', error);
    res.status(500).json({ message: 'Error fetching puzzle' });
  }
});

// Mark a puzzle as completed by the user
router.post("/:topicId/progress", async (req, res) => {
  const { userId, puzzleId, xpGained } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const topicProgress = user.progress.find(
      (progress) => progress.topicId.toString() === req.params.topicId
    );

    if (!topicProgress) {
      const newProgress = {
        topicId: req.params.topicId,
        puzzlesCompleted: [puzzleId],
        xp: xpGained,
        streaks: 1,
      };
      user.progress.push(newProgress);
    } else {
      topicProgress.puzzlesCompleted.push(puzzleId);
      topicProgress.xp += xpGained;
      topicProgress.streaks += 1;
    }

    await user.save();
    res.json({ message: "Progress saved", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Submit an answer for a puzzle
router.post('/:id/submit', auth, async (req, res) => {
  try {
    const puzzle = await Puzzle.findById(req.params.id);
    if (!puzzle) {
      return res.status(404).json({ message: 'Puzzle not found' });
    }

    const { answer } = req.body;
    let isCorrect = false;

    // Different validation based on puzzle type
    switch (puzzle.type) {
      case 'fill-in-code':
      case 'write-code':
        // Run code against test cases
        isCorrect = await validateCodeAnswer(answer, puzzle.testCases);
        break;
      case 'debug-code':
        isCorrect = answer === puzzle.solution;
        break;
      case 'multiple-choice':
        isCorrect = answer === puzzle.solution;
        break;
      case 'concept-matching':
        isCorrect = JSON.stringify(answer) === JSON.stringify(puzzle.solution);
        break;
    }

    res.json({
      isCorrect,
      points: isCorrect ? puzzle.points : 0,
      message: isCorrect ? 'Correct answer!' : 'Try again!'
    });
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({ message: 'Error submitting answer' });
  }
});

// Helper function to validate code answers
async function validateCodeAnswer(code, testCases) {
  try {
    // In a real implementation, this would run the code in a sandbox
    // and check against test cases
    return true; // Placeholder
  } catch (error) {
    console.error('Error validating code:', error);
    return false;
  }
}

module.exports = router;
