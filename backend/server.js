const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-coding-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const aiMentorRoutes = require('./routes/aiMentor');
const authRoutes = require('./routes/auth');
const puzzleRoutes = require('./routes/puzzles');

app.use('/api/ai', aiMentorRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/puzzles', puzzleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
