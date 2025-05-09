const mongoose = require("mongoose");

const puzzleSchema = new mongoose.Schema({
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['fill-in-code', 'debug-code', 'write-code', 'multiple-choice', 'concept-matching']
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard']
  },
  points: {
    type: Number,
    required: true,
    min: 0
  },
  content: {
    type: String,
    required: true
  },
  solution: {
    type: String,
    required: true
  },
  hints: [{
    text: String,
    order: Number
  }],
  testCases: [{
    input: String,
    expectedOutput: String
  }],
  order: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Puzzle", puzzleSchema);
