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

    // LOG IN WITH AN EXISTING USER
    let user = await User.findOne({ steamId });

    // IF NOT REGISTER A NEW ONE
    if (!user) {
      let baseUsername = profile.displayName;
      let uniqueUsername = baseUsername;
      let suffix = 1;

      // CHECK FOR DUPLICATES
      while (await User.findOne({ username: uniqueUsername })) {
        uniqueUsername = `${baseUsername}_${suffix++}`;
      }

      user = await User.create({
        username: uniqueUsername,
        steamId,
        email: '',
        password: '',
        authProvider: 'steam'
      });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));