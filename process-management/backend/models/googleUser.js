const mongoose = require('mongoose');

const GoogleUserSchema = mongoose.Schema({
  googleId: { type: String },
  userDisplayName: { type: String },
  userEmail: { type: String },
  userActive: { type: Boolean },
});

mongoose.model('GoogleUser', GoogleUserSchema);
