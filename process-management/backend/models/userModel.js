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
  userActive: {
    type: Boolean,
  },
});


module.exports = userSchema;
