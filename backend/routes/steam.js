const router = require('express').Router();
const verifyToken = require('../middleware/auth');
const { getPlayerSummaries } = require('../services/steam');

// Protected Steam summary route
router.get('/summary/:steamId', verifyToken, async (req, res) => {
  try {
    const steamId = req.params.steamId;
    const summary = await getPlayerSummaries(steamId);
    res.json(summary);
  } catch (err) {
    console.error('Steam API error:', err);
    res.status(500).json({ message: 'Failed to fetch Steam data' });
  }
});

module.exports = router;
