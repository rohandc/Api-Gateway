const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const router = express.Router();



var api = require('../models/api_key');


function isAuthenticated(req, res, next) {
    if (req.user) {
        if (req.user.authenticated)
            return next();
    }
    res.redirect('/');
}


router.get('/', function (req, res) {
    res.render('index', {user: req.user});
});

router.get('/register', function (req, res) {
    res.render('register', {});
});

router.post('/register', function (req, res, next) {
    Account.register(new Account({username: req.body.username}), req.body.password, function (err, account) {
        if (err) {
            return res.render('register', {error: err.message});
        }

        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});


router.get('/login', function (req, res) {
    res.render('login', {user: req.user, error: req.flash('error')});
});

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), function (req, res, next) {
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/logout', function (req, res, next) {
    req.logout();
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

/*Api Routes*/
router.all('/Api/Nasa', function (req, res) {

    api.nasa().then(function (response) {

        res.status(201).json({nasa:response.body});

    })
});
router.all('/Api/Imdb', function (req, res) {
    api.omdbapi('Deadpool').then(function (response) {
     res.status(201).json({imdb:response});

    })

});
router.all('/Api/Twitter', function (req, res) {
    api.twitter().then(function (tweets, response) {
        res.status(201).json({twitter:tweets});

     }, function (err, response) {
        console.log(err);
    })
});

module.exports = router;
