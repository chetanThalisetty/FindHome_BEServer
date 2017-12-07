const express = require('express');
const router = express.Router();
const homeModel = require('../models/homeModel');

/**
 * @author Chetan Sai Kumar Thalisetty [tchetan1@umbc.edu]
 */

//middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    console.log('---------------------------Trying to search for homes---------------------------------');
    next();
});

router.post('/',function(req, res, next){
    console.log('user trying to get home Info: %j', req.body);

    // res.set({
    //     'Content-Type': 'application/json',
    //     "Access-Control-Allow-Origin": '*'
    // });
    homeModel.getCompleteHouseInfo(req,(result) => {
        res.send(JSON.stringify(result));
    });
});

module.exports = router;