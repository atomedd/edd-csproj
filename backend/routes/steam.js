const router = require('express').Router();
const verifyToken = require('../middleware/auth');
const User = require('../models/User');
const { getPlayerSummaries, getOwnedGames, getTotalPlaytime, getRecentActivity, getSteamOverview, getRecentAchievements } =  require('../services/steam');



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
    const user = await User.findById(req.user.id); 
    if (!user || !user.steamId) {
      return res.status(400).json({ message: 'Steam ID not linked to user.' });
    }

    const overview = await getSteamOverview(user.steamId);
    res.json(overview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Achievements
router.get('/achievements/:steamId', verifyToken, async (req, res) => {
  try {
    const achievements = await getRecentAchievements(req.params.steamId);
    res.json({ achievements });
  } catch (err) {
    console.error('Achievements fetch error:', err.message);
    res.status(500).json({ message: 'Failed to fetch achievements' });
  }
});


// Steam Manual Link

router.put('/link', verifyToken, async (req, res) => {
  const { steamId } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { steamId, steamLinked: true },
      { new: true }
    );

    res.json({ message: 'Your Steam account is now linked!', steamId: user.steamId });
  } catch (err) {
    console.error('Link Steam error:', err.message);
    res.status(500).json({ message: 'Failed to link Steam account' });
  }
});

module.exports = router;
