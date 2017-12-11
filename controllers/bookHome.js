const express = require('express');
const router = express.Router();
const logger = require('../lib/logger');
const bookingModel = require('../models/bookingModel');

/**
 * @author Chetan Sai Kumar Thalisetty [tchetan1@umbc.edu]
 */

//middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    console.log('---------------------------Trying to Book the home ---------------------------------');
    next();
});

router.get('/',function(req, res, next){
    console.log('user trying to book for homes: %j', req.body);
    bookingModel.bookHome(req,(result) => {
        console.log(JSON.parse(JSON.stringify(result)));
        res.send(result);
    });
});

module.exports = router;