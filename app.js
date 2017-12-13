var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var mysql = require('mysql');
var connection = require('express-myconnection');


var index = require('./routes/index');
var users = require('./routes/users');

var travel = require('./routes/travel');
var koreaFood = require('./routes/koreaFood');
var culturelInfo = require('./routes/culturelInfo');
var gallery = require('./routes/gallery');
var contact = require('./routes/contact');
var signup = require('./routes/signup');
var login = require('./routes/login');
var serch = require('./routes/serch');
var profile = require('./routes/profile');
var culture_serch = require('./routes/culture_serch');

var app = express();

require('./public/javascripts/passport')(passport);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'foodimg')));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.locals.fucking = 1;

app.use(

    connection(mysql, {

        host: 'localhost', 
        user: 'root',
        password: 'jungee135',
        port: 3306, 
        database: 'my_schema',
        multipleStatements: true

    }, 'pool')

);

app.use(express.static('./'));


app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(session({
    secret: 'vidyapathaisalwaysrunning',
    resave: true,
    saveUninitialized: true
})); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 



app.use('/', index);
app.use('/users', users);

app.use('/travel', travel);
app.use('/culturelInfo', culturelInfo);
app.use('/koreaFood', koreaFood);
app.use('/culturelInfo', culturelInfo);
app.use('/gallery', gallery);
app.use('/contact', contact);
app.use('/signup', signup);
app.use('/login', login);
app.use('/serch', serch);
app.use('/profile', profile);
app.use('/culture_serch', culture_serch);



app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;