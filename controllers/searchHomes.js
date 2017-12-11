const express = require('express');
const router = express.Router();
const logger = require('../lib/logger');
const searchKeys = require('../utils/constants').SEARCH_KEYS;
const searchModel = require('../models/searchModel');
const server_config =require('../config/server_config');

/**
 * @author Chetan Sai Kumar Thalisetty [tchetan1@umbc.edu]
 */

//middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    console.log('---------------------------Trying to search for homes---------------------------------');

    next();
});
/**
 * trying to search for the homes.
 * example request body
 *
 * @example:
 *
 * check_in: 2017-12-01
 * check_out: 2017-12-10
 * people: 2
 * HOME_TYPE: {}
 * PRICE_RANGE:[0,100]
 * BEDS: 2
 * BEDROOMS: 1
 * BATHROOMS: 1
 * SUPERHOST: True
 * AMENITIES: {}
 * CITY: Austin
 * STATE: Texas
 * COUNTRY: United States
 * Location: {Austin,Texas,United States}
 */
router.post('/',function(req, res, next){
    console.log('user trying to search for homes: %j', req.body);
    // res.set({
    //     'Content-Type': 'application/json',
    //     "Access-Control-Allow-Origin": '*'
    // });
    searchModel.getHomes(req,(result) => {
        // console.log(JSON.parse(JSON.stringify(result)));
        let message = result.message;
        res.render('house_response',{data : message,host_address :server_config.hosting_server_ip,port:server_config.port_no});
    });
});

module.exports = router;