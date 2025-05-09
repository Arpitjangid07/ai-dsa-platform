const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  xp: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  },
  progress: [
    {
      topicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic"
      },
      puzzlesCompleted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Puzzle"
      }],
      xp: Number,
      streaks: Number
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);
