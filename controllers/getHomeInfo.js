const express = require('express');
const router = express.Router();
const homeModel = require('../models/homeModel');
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

router.get('/',function(req, res, next){
    console.log('user trying to get home Info: %j', req.body);

    // res.set({
    //     'Content-Type': 'application/json',
    //     "Access-Control-Allow-Origin": '*'
    // });
    homeModel.getCompleteHouseInfo(req,(result) => {
        console.log(result.message[1]);
        res.render('single_house',{email:result.message[1],data: result.message[0],host_address :server_config.hosting_server_ip,port:server_config.port_no})
        //res.send(JSON.stringify(result));
    });
});

module.exports = router;