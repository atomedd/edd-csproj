require('dotenv').config();
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(new SteamStrategy({
  returnURL: process.env.STEAM_RETURN_URL,
  realm: process.env.STEAM_REALM,
  apiKey: process.env.STEAM_API_KEY
}, async (identifier, profile, done) => {
  try {
    const steamId = profile.id;
    let user = await User.findOne({ steamId });

    if (!user) {
      user = await User.create({
        username: profile.displayName,
        steamId,
        password: '',
        authProvider: 'steam'
      });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));
