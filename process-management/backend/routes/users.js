const express = require('express');

const router = express.Router();
const passport = require('passport');

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.get('/login', (req, res) => {
  res.render('login');
});
/* Google oauth-2 ling */
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/* Google oauth-2 ling */
router.get('/auth/google/success', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.render('sucess');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/users/login');
});

module.exports = router;
