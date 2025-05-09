// seed/seedTopics.js (recommended location)

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Topic = require("../models/Topic"); // Capital 'T' (your model file is named Topic.js)

dotenv.config();

const topics = [
  {
    title: "Stacks",
    description: "A stack is a linear data structure that follows the Last In First Out (LIFO) principle.",
  },
  {
    title: "Queues",
    description: "A queue is a linear data structure that follows the First In First Out (FIFO) principle.",
  },
  {
    title: "Linked Lists",
    description: "A linked list is a sequence of nodes where each node points to the next node.",
  },
  {
    title: "Binary Trees",
    description: "Binary trees are hierarchical structures where each node has at most two children.",
  },
  {
    title: "Graphs",
    description: "Graphs are structures made up of nodes (vertices) connected by edges.",
  },
  {
    title: "Dynamic Programming",
    description: "An optimization technique that solves problems by breaking them down into subproblems.",
  },
  {
    title: "Greedy Algorithms",
    description: "Algorithms that make the locally optimal choice at each step with the hope of finding the global optimum.",
  },
  {
    title: "Recursion",
    description: "Recursion is a method where the solution depends on solutions to smaller instances of the same problem.",
  },
  {
    title: "Hash Tables",
    description: "Hash tables are data structures that implement associative arrays using hash functions.",
  },
  {
    title: "Sorting Algorithms",
    description: "Techniques like quicksort, mergesort, and bubblesort used to arrange data in a particular order.",
  },
  {
    title: "Searching Algorithms",
    description: "Techniques for finding a specific element within a collection of data, like binary search.",
  },
  {
    title: "Backtracking",
    description: "A general algorithm for finding all (or some) solutions to computational problems by incrementally building candidates.",
  },
  {
    title: "Divide and Conquer",
    description: "An algorithm design paradigm that breaks a problem into smaller subproblems, solves them recursively, and combines their solutions.",
  },
  {
    title: "Bit Manipulation",
    description: "Performing operations directly on bits to achieve extremely efficient solutions.",
  },
  {
    title: "Sliding Window",
    description: "A technique for problems involving arrays/lists where you maintain a subset (window) to solve problems efficiently.",
  },
  {
    title: "Two Pointers",
    description: "A technique where two pointers are used to iterate through the data structure in tandem.",
  },
  {
    title: "Topological Sort",
    description: "Ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge, the source comes before the destination.",
  },
  {
    title: "Union Find",
    description: "A data structure that keeps track of elements partitioned into disjoint sets to support union and find operations efficiently.",
  },
  {
    title: "Trie",
    description: "A special tree used to efficiently store associative data structures, often used for dynamic spell checking.",
  },
  {
    title: "Heap",
    description: "A special tree-based structure in which the tree is a complete binary tree and follows the heap property.",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Topic.deleteMany({});
    await Topic.insertMany(topics);

    console.log("✅ Topics seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding topics:", error);
    process.exit(1);
  }
}

seed();
