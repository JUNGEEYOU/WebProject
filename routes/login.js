var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../public/javascripts/passport')(passport);

router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }),
    function(req, res) {

        if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
        } else {
            req.session.cookie.expires = false;
        }
        res.redirect('/');
    });

module.exports = router;