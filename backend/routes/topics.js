const express = require("express");
const router = express.Router();
const Topic = require("../models/Topic");

// Get all topics
router.get("/", async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific topic with puzzles
router.get("/:topicId", async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.topicId).populate("puzzles");
    if (!topic) return res.status(404).json({ message: "Topic not found" });
    res.json(topic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
