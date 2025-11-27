const express = require('express');
const router = express.Router();

// TODO: Implement user routes
router.get('/', (req, res) => {
  res.json({ success: true, message: 'User routes - coming soon' });
});

module.exports = router;
