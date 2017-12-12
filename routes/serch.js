
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('serch',{user:req.user});
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