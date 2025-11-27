const express = require('express');
const router = express.Router();

// TODO: Implement blog routes
router.get('/posts', (req, res) => {
  res.json({ success: true, message: 'Blog routes - coming soon' });
});

module.exports = router;
