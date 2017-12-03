
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
    
     var query = connection.query('SELECT * FROM customer',function(err,rows)
     {
         
         if(err)
             console.log("Error Selecting : %s ",err );
  
         res.render('gallery',{data:rows});
             
        
      });
      
      //console.log(query.sql);
 });
});

router.get('/add', function(req, res, next) {
    res.render('galleryadd');
  });




  //갤러리 업로드 
  router.post('/add',upload.any(), function(req, res, next) {

    var file = req.files;
    console.log(file[0].path);
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            name    : input.name,
            address : input.address,
            email   : input.email,
            phone   : input.phone,
            url : file[0].path
        
        };
        
        var query = connection.query("INSERT INTO customer set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/gallery');
          
        });
        
    });

    //res.render('galleryadd');
  });





  router.get('/delete/:id',function(req, res, next){
    var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM customer  WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/gallery');
             
        });
        
     });
  });


  router.get('/edit/:id', function(req, res, next) {
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM customer WHERE id = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('galleryEdit',{page_title:"Edit Customers - Node.js",data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
    });

  router.post('/edit/:id', function(req, res, next) {
   var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            name    : input.name,
            address : input.address,
            email   : input.email,
            phone   : input.phone 
        
        };
        
        connection.query("UPDATE customer set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/gallery');
          
        });
    
    });
  });


 


 












module.exports = router;