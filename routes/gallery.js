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
      callback(null, 'foodimg/');
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
    
     var query = connection.query('select * from users inner join gallery on users.id= gallery.users_id',function(err,rows)
     {
        //console.log("user", req.user );
        // console.log("join: ",rows );
         if(err)
             console.log("Error Selecting : %s ",err );
  
             if(req.user == undefined){
                 req.user = {id : 0};
             }
         res.render('gallery',{data:rows, user:req.user});
             
        
      });
      
      //console.log(query.sql);
 });
});


router.get('/search', function(req, res, next) {
    console.log("search : ", req. query.search);
    var search = req. query.search;

        req.getConnection(function (err, connection) {
      
            connection.query("SELECT * FROM gallery WHERE name LIKE ? or info LIKE ? ",['%'+search+'%', '%'+search+'%'], function(err, rows)
            {
                 if(err)
                     console.log("Error deleting : %s ",err );
                
                console.log("this: ", rows);


                res.render('search',{data: rows, search: search} );
            });
         });
          
  });



router.get('/add', function(req, res, next) {
    res.render('galleryadd');
  });




  //갤러리 업로드 
  router.post('/add',upload.any(), function(req, res, next) {
  
    var file = req.files;
    // console.log(file[0].path);
    // console.log(req.RowDataPacket);
    // console.log("user: "+req.user);
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            name    : input.name,
            info : input.info,
            url : file[0].path,
            users_id : req.user.id
        };
        
        var query = connection.query("INSERT INTO gallery set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/gallery');
          
        });
        
    });
  });





  router.delete('/delete/:gallery_id',function(req, res, next){
    var gallery_id = req.params.gallery_id;
    

     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM gallery  WHERE gallery_id = ? ",[gallery_id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/gallery');
             
        });
        
     });
  });


  router.get('/edit/:gallery_id', function(req, res, next) {
    var gallery_id = req.params.gallery_id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM gallery WHERE gallery_id = ?',[gallery_id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('galleryEdit',{page_title:"Edit Customers - Node.js",data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
    });

  router.post('/edit/:gallery_id', function(req, res, next) {
   var input = JSON.parse(JSON.stringify(req.body));
    var gallery_id = req.params.gallery_id;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            name  : input.name,
            info : input.info,
        
        };
        
        connection.query("UPDATE gallery set ? WHERE gallery_id = ? ",[data,gallery_id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/gallery');
          
        });
    
    });
  });


 


module.exports = router;