exports.isLoggedin = ((req, res, done) => {
  // console.log('req.user-', req.user);
  if (!req.isAuthenticated()) {
    res.status(401).send('Unauthorized');
  } else {
    done();
  }
});
