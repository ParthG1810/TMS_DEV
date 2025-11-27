const express = require('express');
const router = express.Router();

// TODO: Implement kanban routes
router.get('/board', (req, res) => {
  res.json({ success: true, message: 'Kanban routes - coming soon' });
});

module.exports = router;
