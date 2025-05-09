// models/UserProgress.js
const mongoose = require('mongoose');

const UserProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
  progress: { type: Number, required: true },  // Store progress as a percentage or score
});

const UserProgress = mongoose.model('UserProgress', UserProgressSchema);

module.exports = UserProgress;
