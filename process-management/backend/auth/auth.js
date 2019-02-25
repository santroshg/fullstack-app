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
  console.log('-------deserializeUser--', id);
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
  // console.log('profile---', profile.emails[0].value);
  GoogleUser.findOne({ googleId: profile.id })
    .then((existingUser) => {
      if (existingUser) {
        done(null, existingUser);
      } else {
        new GoogleUser({
          googleId: profile.id,
          userDisplayName: profile.displayName,
          userEmail: profile.emails[0].value,
          userActive: false,
        }).save().then((user) => {
          done(null, user);
        });
      }
    });
  




//   const UserModel = mongoose.model('users', userModel);
//   UserModel.findOne({
//     userId: profile.id,
//   }).then((user) => {
//     if (user) {
//       user.token = refreshToken.access_token;
//       done(null, user);
//     } else if (profile) {
//       const userModelData = new UserModel({
//         userId: profile.id,
//         userDisplayName: profile.displayName,
//         userEmail: profile.emails[0].value,
//         userActive: true,
//       });
//       userModelData.save().then((res) => {
//         user.token = refreshToken.access_token;
//         done(null, res);
//       }).catch((error) => {
//         throw (error);
//       }).catch((error) => {
//         throw (error);
//       });
//     }
//   }).catch((error) => {
//     throw (error);
//   });
}
)));
