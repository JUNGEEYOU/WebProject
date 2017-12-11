var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash    = require('connect-flash');
var mysql = require('mysql');
var connection  = require('express-myconnection'); 


var index = require('./routes/index');
var users = require('./routes/users');
var main = require('./routes/main');
var aboutKorea = require('./routes/aboutKorea');
var koreaFood = require('./routes/koreaFood');
var culturelInfo = require('./routes/culturelInfo');
var gallery = require('./routes/gallery');
var contact = require('./routes/contact');
var signup = require('./routes/signup');
var login = require('./routes/login');
var serch = require('./routes/serch');
var profile = require('./routes/profile');


var app = express();

require('./public/javascripts/passport')(passport); 


// view engine setup
app.set('views', path.join(__dirname, 'views'));
// 이거 설절이 필요함!!
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'foodimg')));

app.use(bodyParser.urlencoded({extended: true}));
app.locals.fucking = 1;

app.use(
  
  connection(mysql,{
      
      host: 'localhost', //'localhost',
      user: 'root',
      password : 'jungee135',
      port : 3306, //port mysql
      database:'my_schema',
      multipleStatements: true

  },'pool') //or single

);

app.use(express.static('./')); 

/* set middlewares */
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session



app.use('/', index);
app.use('/users', users);
app.use('/main', main);
app.use('/aboutKorea', aboutKorea);
app.use('/culturelInfo', culturelInfo);
app.use('/koreaFood', koreaFood);
app.use('/culturelInfo', culturelInfo);
app.use('/gallery', gallery);
app.use('/contact', contact);
app.use('/signup', signup);
app.use('/login', login);
app.use('/serch', serch);
app.use('/profile',profile);



  



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
