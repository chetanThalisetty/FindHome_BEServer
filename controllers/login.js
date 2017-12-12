const express = require('express');
const logger = require('../lib/logger.js');
const router = express.Router();
const passport = require('passport');
const server_config =require('../config/server_config');
const constants = require('../utils/constants');


//middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//     console.log(req);
//     console.log("In login Request");
//     console.log('Time: ', Date.now());
//     next();
// });

// router.post('/', passport.authenticate('local', {
//     successRedirect : '/findHome', // redirect to the secure profile section
//     failureRedirect : '/login_page', // redirect back to the signup page if there is an error
//     failureFlash : true // allow flash messages
// }));

// app.get('/login', function(req, res, next) {
//    (req, res, next);
// });
//


router.post('/', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return  res.render('login',{error: info.message,host_address :server_config.hosting_server_ip,port:server_config.port_no});
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            console.log("I m inside here");
            console.log(user);
            return res.render('index',{data:user, title: 'Find Home', host_address :server_config.hosting_server_ip,port:server_config.port_no});
        });
    })(req, res, next);
});

module.exports = router;