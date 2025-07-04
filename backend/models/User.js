const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: false,
    unique: true,
    sparse: true
  },
  password: {
    type: String,
    required: function () {
      return !this.steamId && !this.xboxId && !this.psnId;
    },
  },
  steamId: { type: String, default: '' },
  xboxId: { type: String, default: '' },
  psnId: { type: String, default: '' },
  friends: [String],
  preferences: Object,
});

module.exports = mongoose.model('User', UserSchema);
