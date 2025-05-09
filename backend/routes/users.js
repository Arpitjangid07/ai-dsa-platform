// routes/users.js
const express = require('express');
const router = express.Router();

// Example route for getting users
router.get('/', (req, res) => {
  res.json({ message: "List of users" });
});

module.exports = router;
