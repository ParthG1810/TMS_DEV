const express = require('express');
const router = express.Router();

// TODO: Implement calendar routes
router.get('/events', (req, res) => {
  res.json({ success: true, message: 'Calendar routes - coming soon' });
});

module.exports = router;
