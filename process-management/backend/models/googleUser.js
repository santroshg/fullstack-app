const mongoose = require('mongoose');

const GoogleUserSchema = mongoose.Schema({
  googleId: { type: String },
  userDisplayName: { type: String },
  userEmail: { type: String },
  profileImgUrl: { type: String },
});

mongoose.model('GoogleUser', GoogleUserSchema);
