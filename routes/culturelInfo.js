
var express = require('express');
var router = express.Router();
var fs = require('fs'); 
var request = require('request');
var url = require('url'); // to parse URL and separate filename from path
var progress = require('progress-stream'); // to have a progress bar during upload
var multer = require('multer'); // library to uplaod photos https://github.com/expressjs/multer
var path = require('path');
var bodyParser = require("body-parser");


var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'culture/');
  },
  filename: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    var filename = path.basename(file.originalname, ext);

    callback(null, filename + Date.now() + ext);
  }
});


var upload = multer({storage: storage});


/* GET home page. */
router.get('/', function(req, res, next) {
  
    req.getConnection(function(err,connection){
      
       var query = connection.query('select * from users inner join culture on users.id= culture.users_id;'+'select *  from culture inner join culture_comment on culture.culture_id = culture_comment.culture_id ;' ,function(err,rows)
       {
          //console.log("user", req.user );
          // console.log("join: ",rows );
           if(err)
               console.log("Error Selecting : %s ",err );
               //console.log("ataaa", rows);
               if(req.user == undefined){
                   req.user = {id : 0};
               }
  
           res.render('culturelInfo',{data:rows, user:req.user, id: 0,comments: rows[1]});
        });
  
   });
  });



  router.get('/culture_serch', function(req, res, next) {
    console.log("search : ", req.query.search);
    var search = req.query.search;

        req.getConnection(function (err, connection) {
      //select * from culture inner join culture_comment  on culture.culture_id = culture_comment.culture_id  WHERE culture.culture_name LIKE ? or culture.culture_info LIKE ?; 
            connection.query("select * from culture inner join culture_comment  on culture.culture_id = culture_comment.culture_id  WHERE culture.culture_name LIKE ? or culture.culture_info LIKE ?",['%'+search+'%', '%'+search+'%'], function(err, rows)
            {
                 if(err)
                     console.log("Error deleting : %s ",err );
                
                console.log("this: ", rows);


                res.render('culture_serch',{data: rows, search: search, user: req.user} );
            });
         });
          
  });





router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err){
    if(err){console.log(err)}
    res.send("<script>alert('로그아웃됨'); location.href='/';</script>");
  }
  
  );
  res.render('culturelInfo', {user:req.user});
});




router.post('/comment/:culture_id', function(req, res, next) {
  
//  var username = req.params.username;
  
    var input = JSON.parse(JSON.stringify(req.body));
    
    console.log("parms id: ", req.params.culture_id);
    req.getConnection(function (err, connection) {
        
        var data = {
            culture_comment    : input.comment,
            culture_id : req.params.culture_id,
            culture_username : req.user.username
        };
        
        var query = connection.query("INSERT INTO culture_comment set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         

              console.log("comment culut:", rows);
          res.redirect('/culturelInfo');
          
        });
        
    });
  });



router.get('/cultureComment/:culture_id', function(req, res, next) {
  var culture_id = req.params.culture_id;


  console.log("gaaaa", culture_id);
  req.getConnection(function(err,connection){
     
      var query = connection.query('select * from culture inner join culture_comment on culture.culture_id = culture_comment.culture_id where culture_comment.culture_id =  ?;'+'select * from users inner join culture on users.id= culture.users_id where culture.culture_id = ?',[culture_id, culture_id],function(err,rows)
      {
          
          if(err)
              console.log("Error Selecting : %s ",err );
   
              if(req.user == undefined){
                  req.user = {id : 0};
              }

              console.log("tttttttttt", rows[1]);

          res.render('cultureComment',{title : "test", data:rows, user:req.user});
              
         
       });
       
       //console.log(query.sql);
  }); 
  });





router.get('/add',isLoggedIn, function(req, res, next) {
  res.render('cultureAdd', {
      user: req.user
  });
});


  //갤러리 업로드 
  router.post('/add',upload.any(), function(req, res, next) {
    
      var file = req.files;
  
      var input = JSON.parse(JSON.stringify(req.body));
      
      req.getConnection(function (err, connection) {
          
          var data = {
            culture_name    : input.name,
            culture_info : input.info,
            culture_url : file[0].path,
              users_id : req.user.id
          };
          
          var query = connection.query("INSERT INTO culture set ? ",data, function(err, rows)
          {
    
            if (err)
                console.log("Error inserting : %s ",err );
           
            res.redirect('/culturelInfo');
            
          });
          
      });
    });



    ///

    router.get('/delete/:culture_id',function(req, res, next){
      var culture_id = req.params.culture_id;
      
  
       req.getConnection(function (err, connection) {
          
          connection.query("SET foreign_key_checks = 0;"+"DELETE FROM culture  WHERE culture_id = ? ",[culture_id], function(err, rows)
          {
              
               if(err)
                   console.log("Error deleting : %s ",err );
              

                   console.log("del", rows);
               res.redirect('/culturelInfo');
               
          });
          
       });
    });
  
  
    router.get('/edit/:culture_id', function(req, res, next) {
      var culture_id = req.params.culture_id;
      
      req.getConnection(function(err,connection){
         
          var query = connection.query('SELECT * FROM culture WHERE culture_id = ?',[culture_id],function(err,rows)
          {
              
              if(err)
                  console.log("Error Selecting : %s ",err );
       
              res.render('cultureEdit',{page_title:"Edit Customers - Node.js",data:rows,user:req.user});
                  
             
           });
           
           //console.log(query.sql);
      }); 
      });


  
    router.post('/edit/:culture_id', function(req, res, next) {
     var input = JSON.parse(JSON.stringify(req.body));
      var culture_id = req.params.culture_id;
      
      req.getConnection(function (err, connection) {
          
          var data = {
              
            culture_name  : input.name,
            culture_info : input.info,
          
          };
          
          connection.query("UPDATE culture set ? WHERE culture_id = ? ",[data,culture_id], function(err, rows)
          {
    
            if (err)
                console.log("Error Updating : %s ",err );
           
            res.redirect('/culturelInfo');
            
          });
      
      });
    });
  
  
   









module.exports = router;
function isLoggedIn(req, res, next) {
  
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();
  
    // if they aren't redirect them to the home page
    
    res.redirect('/login');
  }

