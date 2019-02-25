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
usersRouter.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
  // res.redirect(`http://localhost:3001?user=${req.user}`);
  // res.redirect('/user/loggedin/test');
    res.send('hihihihhihihihih');
  });

usersRouter.get('/api/current_user', (req, res) => {
  console.log('server side ---------------------', req.headers);
  res.send(req.user);
});

usersRouter.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/users/login');
});

module.exports = usersRouter;
