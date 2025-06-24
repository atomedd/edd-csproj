const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  steamId: String,
  xboxId: String,
  psnId: String,
  friends: [String], // List of user IDs
  preferences: Object,
});

module.exports = mongoose.model('User', UserSchema);
