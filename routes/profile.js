var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('profile', {
    user : req.user // get the user out of session and pass to template
  });
});


router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err){
    if(err){console.log(err)}
    res.send("<script>alert('로그아웃됨'); location.href='/';</script>");
  }
  
  );
  res.render('/', {user:req.user});
});


module.exports = router;

function isLoggedIn(req, res, next) {
  
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();
  
    // if they aren't redirect them to the home page
    
    res.redirect('/login');
  }