const express = require('express');
const logger = require('../lib/logger.js');
const router = express.Router();
const passport = require('passport');


//middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log("In login Request");
    console.log('Time: ', Date.now());
    next();
})

router.post('/', passport.authenticate('local', {
    successRedirect : '/FindHome', // redirect to the secure profile section
    failureRedirect : '', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

module.exports = router;