const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const handleAiMentor = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an AI mentor helping students learn Data Structures and Algorithms.' },
        { role: 'user', content: message }
      ],
    });

    const reply = chatResponse.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('AI Mentor Error:', error);
    res.status(500).json({ error: 'Something went wrong with the AI mentor.' });
  }
};

module.exports = { handleAiMentor };
