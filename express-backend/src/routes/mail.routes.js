const express = require('express');
const router = express.Router();

// TODO: Implement mail routes
router.get('/mails', (req, res) => {
  res.json({ success: true, message: 'Mail routes - coming soon' });
});

module.exports = router;
