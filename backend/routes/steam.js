const router = require('express').Router();
const verifyToken = require('../middleware/auth');
const User = require('../models/User');
const { getPlayerSummaries, getOwnedGames, getTotalPlaytime, getRecentActivity, getSteamOverview } = require('../services/steam');


// Summary
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

  // Games

router.get('/owned/:steamId', verifyToken, async (req, res) => {
  try {
    const games = await getOwnedGames(req.params.steamId);
    res.json({ games });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Time Played

router.get('/playtime/:steamId', verifyToken, async (req, res) => {
  try {
    const playtime = await getTotalPlaytime(req.params.steamId);
    res.json(playtime);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Steam user

router.get('/recent/:steamId', verifyToken, async (req, res) => {
  try {
    const activity = await getRecentActivity(req.params.steamId);
    res.json({ recent: activity });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Steam Overview

router.get('/overview', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // ⬅ from token
    if (!user || !user.steamId) {
      return res.status(400).json({ message: 'Steam ID not linked to user.' });
    }

    const overview = await getSteamOverview(user.steamId);
    res.json(overview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Steam Manual Link

router.put('/steam-id', verifyToken, async (req, res) => {
  try {
    const { steamId } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { steamId },
      { new: true }
    );
    res.json({ message: 'Steam ID updated', steamId: user.steamId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
