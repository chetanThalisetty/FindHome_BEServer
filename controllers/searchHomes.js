const express = require('express');
const router = express.Router();
const logger = require('../lib/logger');
const searchKeys = require('../utils/constants').SEARCH_KEYS;

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
 * HOME_TYPE: entire
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
    let values = {};
    const check_in_date =req.body.check_in;
    const check_out_date = req.body.check_out;
    const people_count = req.body.people;
    const home_type = req.body.home_type;
    const price_range = req.body.price_range;
    const bed_count = req.body.beds;
    const bedroom_count = req.body.bedrooms;
    const bathroom_count = req.body.bathrooms;
    const shouldBeSuperHost = req.body.superhost;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;

});

module.exports = router;