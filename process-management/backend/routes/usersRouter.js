const express = require('express');

const usersRouter = express.Router();
const passport = require('passport');
const url = require('../config/config');

/* GET users listing. */
usersRouter.get('/', (req, res) => {
  res.send('respond with a resource');
});

usersRouter.get('/login', (req, res) => {
  res.render('login');
});

/* Google oauth-2 ling */
usersRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/* Google oauth-2 ling */
usersRouter.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(`${url.frontendHost}/home`);
    // res.redirect('/user/loggedin/test');
    // res.send('Successfully loggedin');
  });

usersRouter.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

usersRouter.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect(url.frontendHost);
});

module.exports = usersRouter;
