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


module.exports = userSchema;
