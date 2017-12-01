
var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../public/javascripts/passport')(passport); 

router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', passport.authenticate('local-login', {
  successRedirect : '/profile', // redirect to the secure profile section
  failureRedirect : '/login', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}),
function(req, res) {
  console.log("hello");

  if (req.body.remember) {
    req.session.cookie.maxAge = 1000 * 60 * 3;
  } else {
    req.session.cookie.expires = false;
  }
res.redirect('/');
});

module.exports = router;