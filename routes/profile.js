var express = require('express');
var router = express.Router();

router.get('/', isLoggedIn, function(req, res, next) {
    res.render('profile', {
        user: req.user
    });
});


router.get('/logout', function(req, res, next) {
    req.session.destroy(function(err) {
            if (err) {
                console.log(err)
            }
            res.send("<script>alert('Logout!'); location.href='/';</script>");
        }

    );
    res.render('/', {
        user: req.user
    });
});


module.exports = router;

function isLoggedIn(req, res, next) {


    if (req.isAuthenticated())
        return next();



    res.redirect('/login');
}