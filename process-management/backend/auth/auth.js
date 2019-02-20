const passport = require('passport');
const UserModel = require('../models/userModel');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const goolgeAuthCredentials = require('../config/googleAuthCredentials.js');

console.log('goolgeAuthCredentials.web.redirect_uris', goolgeAuthCredentials.web.redirect_uris)
passport.use(new GoogleStrategy({
        clientID: goolgeAuthCredentials.web.client_id,
        clientSecret: goolgeAuthCredentials.web.client_secret,
        callbackURL: goolgeAuthCredentials.web.redirect_uris
    },
    function (request, accessToken, refreshToken, profile, done) {
        // console.log('request', request);
        // console.log('accessToken', accessToken);
        // console.log('refreshToken', refreshToken);
        console.log('profile', profile);
        console.log('done', done);
        UserModel.findOne({
            googleId: profile.id
        }).then(user => {
            console.log('user', user);
            if (user) {
                done(null, user);
            } else {
                const userModel = new UserModel({
                    userId: Math.random() * 100 + '',
                    googleId: profile.id,
                    userDisplayName: profile.displayName,
                    userEmail: ''
                })
                userModel.save().then(res => {
                    done(null, res);
                }).catch((error) => {
                    console.log('error', error);
                });
            }
        }).catch((error) => {
            console.log('error', error);
        });
        // UserModel.findOne({ googleId: profile.id }, function (err, user) {
        //   return done(err, user);
        // });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });