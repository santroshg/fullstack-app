const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userId: {
    type: String,
  },
  userDisplayName: {
    type: String,
  },
  userEmail: {
    type: String,
  },
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
