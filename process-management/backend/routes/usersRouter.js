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
usersRouter.get('/auth/google/success', passport.authenticate('google', { failureRedirect: 'http://localhost:3001/auth/google' }), (req, res) => {
  console.log('res', res);
  const { token } = req.user;
  res.redirect(`http://localhost:3001?token=${token}`);
});

usersRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/users/login');
});

module.exports = usersRouter;
