var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('index', {
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