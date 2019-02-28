const mongoose = require('mongoose');

const passport = require('passport');
// eslint-disable-next-line import/order
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GoogleUser = mongoose.model('GoogleUser');
// const userModel = require('../models/userModel');
const goolgeAuthCredentials = require('../config/googleAuthCredentials.js');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  GoogleUser.findById(id)
    .then((user) => {
      done(null, user);
    });
});

passport.use(new GoogleStrategy({
  clientID: goolgeAuthCredentials.web.client_id,
  clientSecret: goolgeAuthCredentials.web.client_secret,
  callbackURL: goolgeAuthCredentials.web.redirect_uris,
},
((request, accessToken, refreshToken, profile, done) => {
  // console.log('profile---', profile._json.image.url);
  GoogleUser.findOne({ googleId: profile.id })
    .then((existingUser) => {
      if (existingUser) {
        done(null, existingUser);
      } else {
        new GoogleUser({
          googleId: profile.id,
          userDisplayName: profile.displayName,
          userEmail: profile.emails[0].value,
          profileImgUrl: profile._json.image.url,
        }).save().then((user) => {
          done(null, user);
        });
      }
    });
}
)));
