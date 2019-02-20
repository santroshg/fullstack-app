const express = require('express');

const usersRouter = express.Router();
const passport = require('passport');

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
usersRouter.get('/auth/google/success', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.render('sucess');
});

usersRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/users/login');
});

module.exports = usersRouter;
