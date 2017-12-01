
var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../public/javascripts/passport')(passport); 


// pool.getConnection(function(err, conn) {
// 	if ( err ) {
// 	   console.error('Error', err);
// 	   return;
// 	}


router.get('/', function(req, res, next) {
	res.render('signup');

});

// router.post('/',function(req,res,next){
// 	console.log('req.body : '+req.body);
// 	var  data = req.body;
// 	var arr =[data.email, data.password, data.name]
// 	console.log(data.name);


// 		var sql = 	'INSERT INTO member_info (email, password, name) VALUES (?, ?, ?);';
// 		conn.query(sql, arr, function(err, results) {
// 			if ( err ) {
// 				console.error('INSERT Error', err);
// 			 }
// 			 else {
// 				console.log('results : ', results);
// 			 }
		   
// 		   conn.release();      
// 		});
// 	 });



// });
router.post('/', passport.authenticate('local-signup', {
	successRedirect : '/profile', // redirect to the secure profile section
	failureRedirect : '/signup', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));

module.exports = router;



  