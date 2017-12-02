
var express = require('express');
var router = express.Router();

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


  router.post('/add', function(req, res, next) {
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            name    : input.name,
            address : input.address,
            email   : input.email,
            phone   : input.phone 
        
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