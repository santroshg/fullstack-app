const passport = require('passport');
const UserModel = require('../models/userModel');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const goolgeAuthCredentials = require('../config/googleAuthCredentials.js');

passport.use(new GoogleStrategy({
        clientID: goolgeAuthCredentials.web.client_id,
        clientSecret: goolgeAuthCredentials.web.client_secret,
        callbackURL: goolgeAuthCredentials.web.redirect_uris
    },
    function (request, accessToken, refreshToken, profile, done) {
        console.log('profile', profile);
        UserModel.findOne({
            userId: profile.id
        }).then(user => {
            console.log('user', user);
            if (user) {
                done(null, user);
            } else {
                if(profile){
                    const userModel = new UserModel({
                        userId: profile.id,
                        userDisplayName: profile.displayName,
                        userEmail: profile.emails[0].value
                    })
                    userModel.save().then(res => {
                        done(null, res);
                    }).catch((error) => {
                        console.log('error', error);
                    });
                }

            }
        }).catch((error) => {
            console.log('error', error);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });