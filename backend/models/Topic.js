const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  estimatedTime: {
    type: String,
    required: true
  },
  prerequisites: [{
    type: String
  }],
  puzzles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Puzzle'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Topic", topicSchema);
