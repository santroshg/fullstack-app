/* eslint-disable prefer-destructuring */
const express = require('express');
const usersRouter = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GoogleUser = require('../models/googleUser');
const url = require('../config/config');
const goolgeAuthCredentials = require('../config/googleAuthCredentials');
const membersController = require('../controllers/membersController');

/* GET users listing. */
usersRouter.get('/', (req, res) => {
  res.send('respond with a resource');
});

usersRouter.get('/login', (req, res) => {
  res.render('login');
});

/* Google oauth-2 ling */
usersRouter.get('/auth/google', (req, res, next) => {
  // console.log('auth/google------------------------------', req.query);
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    state: `${req.query.boardId},${req.query.userId}`,
  })(req, res, next);
});

/* Google oauth-2 ling */
usersRouter.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res, next) => {
    const stateArray = req.query.state.split(',');
    if ((stateArray[0] === '' || stateArray[0] === 'undefined') && (stateArray[1] === '' || stateArray[1] === 'undefined')) { // this condition for normal login.
      // console.log('This is normal login--------------------------------------', stateArray);
      res.redirect(`${url.frontendHost}/home`);
    } else { // this cindition is for accept request to add member. here boardId, userId will have some value
      // console.log('This is accept request flow-------------------', stateArray);
      // console.log('000000000000000000000000000--------------', req.user);
      req.boardId = stateArray[0];
      req.userId = stateArray[1];
      membersController.acceptRequest(req, res, next);
    }
  });

usersRouter.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

usersRouter.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect(url.frontendHost);
});

module.exports = usersRouter;
