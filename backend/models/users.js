const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  steamId: { type: String, default: '' },
  xboxId: { type: String, default: '' },
  psnId: { type: String, default: '' },
  friends: [String],
  preferences: Object,
});

module.exports = mongoose.model('User', UserSchema);