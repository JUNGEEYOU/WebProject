

var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../public/javascripts/passport')(passport); 

router.get('/', function(req, res, next) {
	res.render('signup',{user:req.user});

});

router.get('/logout', function(req, res, next) {
	req.session.destroy(function(err){
	  if(err){console.log(err)}
	  res.send("<script>alert('로그아웃됨'); location.href='/';</script>");
	}
	
	);
	res.render('/', {user:req.user});
  });


router.post('/', passport.authenticate('local-signup', {
	successRedirect : '/profile', // redirect to the secure profile section
	failureRedirect : '/signup', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));

module.exports = router;



  