const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

// Available models configuration
const AVAILABLE_MODELS = {
  'gpt-3.5-turbo': 'GPT-3.5 Turbo',
  'gpt-4': 'GPT-4',
  'claude-2': 'Claude 2',
  'claude-instant': 'Claude Instant'
};

// Store conversation history (in production, use a proper database)
const conversationHistory = new Map();

router.post('/mentor', async (req, res) => {
  const { message, userId, model = 'gpt-3.5-turbo' } = req.body;

  try {
    // Validate model
    if (!AVAILABLE_MODELS[model]) {
      return res.status(400).json({ error: 'Invalid model selected' });
    }

    // Get or initialize conversation history
    if (!conversationHistory.has(userId)) {
      conversationHistory.set(userId, []);
    }
    const history = conversationHistory.get(userId);

    // Add user message to history
    history.push({ role: 'user', content: message });

    // Limit history to last 10 messages to prevent token limit issues
    const recentHistory = history.slice(-10);

    const response = await openai.chat.completions.create({
      model: model,
      messages: recentHistory,
      temperature: 0.7,
      max_tokens: 1000,
    });

    const aiReply = response.choices[0].message.content;
    
    // Add AI response to history
    history.push({ role: 'assistant', content: aiReply });

    res.json({ 
      reply: aiReply,
      model: AVAILABLE_MODELS[model],
      history: recentHistory
    });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ 
      error: 'Something went wrong with the AI service.',
      details: error.message 
    });
  }
});

// Get available models
router.get('/models', (req, res) => {
  res.json({ models: AVAILABLE_MODELS });
});

// Clear conversation history
router.post('/clear-history', (req, res) => {
  const { userId } = req.body;
  if (userId && conversationHistory.has(userId)) {
    conversationHistory.delete(userId);
  }
  res.json({ success: true });
});

module.exports = router;
