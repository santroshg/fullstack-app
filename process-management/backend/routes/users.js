var express = require('express');
var router = express.Router();
var passport = require('passport');
passport.initialize();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res) {
  res.render('login');
});
/* Google oauth-2 ling */
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/* Google oauth-2 ling */
router.get('/auth/google/success', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res, next) {
  res.render('sucess');
})

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/users/login');
})

module.exports = router;
