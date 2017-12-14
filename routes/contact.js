
var express = require('express');
var nodemailer = require('nodemailer');

var router = express.Router();



var transporter = nodemailer.createTransport({
  service: 'naver',
  auth: {
      user: 'junge2u@naver.com',
      pass: 'jungee135~'
  }
});



router.get('/', function(req, res, next) {
  res.render('contact',{user:req.user});
});

router.post('/', function(req, res, next){
  var input = JSON.parse(JSON.stringify(req.body));

  var mailOptions = {
    from: input.email,
    to: 'junge2u@naver.com',
    subject: input.subject,
    text: 'name: '+ input.name + '\nphone: '+ input.tel + '\nmessage: ' + input.message
  };
  
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent! : ' + info.response);
    }
    transporter.close();
  });
  res.send("<script>alert('send email!'); location.href='/';</script>");
  res.redirect('/');

});



router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err){
    if(err){console.log(err)}
    res.send("<script>alert('Logout!'); location.href='/';</script>");
  }
  
  );
  res.render('/', {user:req.user});
});





module.exports = router;