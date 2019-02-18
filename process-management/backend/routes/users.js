var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Google oauth-2 ling */
router.get('/auth/google', function(req, res, next) {
  res.render('login');
});

/* Google oauth-2 ling */
router.get('/auth/google/sucess', function(req, res, next) {
  res.render('sucess');
})

module.exports = router;
