const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.askMentor = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'gpt-3.5-turbo',
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error('AI Mentor Error:', err.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
