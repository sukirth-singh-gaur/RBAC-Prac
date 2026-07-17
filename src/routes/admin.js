const express = require('express');
const { verifyToken, checkRole } = require('../middleware/auth');
const { getAllUsers } = require('../data/users');

const router = express.Router();

// GET /api/admin/users — admin only
router.get('/users', verifyToken, checkRole('admin'), (req, res) => {
  res.json({ users: getAllUsers() });
});

module.exports = router;