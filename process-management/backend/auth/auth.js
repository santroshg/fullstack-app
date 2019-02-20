const passport = require('passport');
// eslint-disable-next-line import/order
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('../models/userModel');
const goolgeAuthCredentials = require('../config/googleAuthCredentials.js');

passport.use(new GoogleStrategy({
  clientID: goolgeAuthCredentials.web.client_id,
  clientSecret: goolgeAuthCredentials.web.client_secret,
  callbackURL: goolgeAuthCredentials.web.redirect_uris,
},
((request, accessToken, refreshToken, profile, done) => {
  UserModel.findOne({
    userId: profile.id,
  }).then((user) => {
    if (user) {
      done(null, user);
    } else if (profile) {
      const userModel = new UserModel({
        userId: profile.id,
        userDisplayName: profile.displayName,
        userEmail: profile.emails[0].value,
      });
      userModel.save().then((res) => {
        done(null, res);
      }).catch((error) => {
        throw (error);
      }).catch((error) => {
        throw (error);
      });
    }
  }).catch((error) => {
    throw (error);
  });
})));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
