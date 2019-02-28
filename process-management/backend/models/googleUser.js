const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const GoogleUserSchema = mongoose.Schema({
  googleId: { type: String },
  userDisplayName: { type: String },
  userEmail: { type: String, unique: true },
  profileImgUrl: { type: String },
});

GoogleUserSchema.plugin(uniqueValidator);

mongoose.model('GoogleUser', GoogleUserSchema);

module.exports = mongoose.model('GoogleUser', GoogleUserSchema);
