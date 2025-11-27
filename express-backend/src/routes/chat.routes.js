const express = require('express');
const router = express.Router();

// TODO: Implement chat routes
router.get('/conversations', (req, res) => {
  res.json({ success: true, message: 'Chat routes - coming soon' });
});

module.exports = router;
