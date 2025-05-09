const mongoose = require('mongoose');
const Puzzle = require('./models/Puzzle');
const Topic = require('./models/Topic');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ai-coding-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');

  try {
    // Create a test topic
    const topic = new Topic({
      name: 'Introduction to JavaScript',
      title: 'Introduction to JavaScript',
      description: 'Learn the basics of JavaScript programming',
      difficulty: 'Beginner',
      estimatedTime: '2 hours',
      prerequisites: ['Basic Programming'],
      isActive: true
    });

    await topic.save();
    console.log('Created test topic:', topic._id);

    // Create test puzzles
    const puzzles = [
      {
        topicId: topic._id,
        type: 'fill-in-code',
        title: 'Hello World Function',
        description: 'Complete the function to return "Hello, World!"',
        difficulty: 'Easy',
        points: 10,
        content: 'function sayHello() {\n  // Your code here\n}',
        solution: 'function sayHello() {\n  return "Hello, World!";\n}',
        hints: [
          { text: 'Use the return keyword', order: 1 },
          { text: 'Return a string with the text "Hello, World!"', order: 2 }
        ],
        testCases: [
          { input: '', expectedOutput: 'Hello, World!' }
        ],
        order: 1,
        isActive: true
      },
      {
        topicId: topic._id,
        type: 'debug-code',
        title: 'Fix the Sum Function',
        description: 'Find and fix the error in the sum function',
        difficulty: 'Medium',
        points: 20,
        content: 'function sum(a, b) {\n  return a - b;\n}',
        solution: 'function sum(a, b) {\n  return a + b;\n}',
        hints: [
          { text: 'Check the operator being used', order: 1 },
          { text: 'The function should add the numbers, not subtract them', order: 2 }
        ],
        testCases: [
          { input: '2, 3', expectedOutput: '5' },
          { input: '10, 5', expectedOutput: '15' }
        ],
        order: 2,
        isActive: true
      }
    ];

    const savedPuzzles = await Puzzle.insertMany(puzzles);
    console.log('Created test puzzles');

    // Update topic with puzzles
    topic.puzzles = savedPuzzles.map(p => p._id);
    await topic.save();
    console.log('Updated topic with puzzles');

    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}); 