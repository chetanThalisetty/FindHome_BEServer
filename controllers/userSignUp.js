const express = require('express');
const hashHelper = require('../lib/hash');
const user = require('../models/userInfo');
const table_info = require('../config/table_info');
const constants = require('../utils/constants');
const router = express.Router();
const server_config =require('../config/server_config');
/**
 * gets the request for User SignUp. Express router helps to seperate the modules.
 * Request body should have
 * EmailID : this is used for the next login
 * Password: hashing has to be done for encryption purposes
 * ---------------------------------------------------------------
 * Note: Here route.all is used as it can accept both get and post requests
 * ----------------------------------------------------------------
 * @example:
 * curl -v -H "Content-Type: application/json"
 * -d '{"emailID": "tchetan1@umbc.edu", "password": "6672164781"}'
 * http://localhost:3000/userSignUp
 * ----------------------------------------------------------------
 * @author Chetan Sai Kumar Thalisetty [tchetan1@umbc.edu]
 */

//middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.post('/', function(req, res, next){
    console.log('user sign up request: %j', req.body );
    let values = {};
    let colNames = table_info.USER.columnName;
    values[colNames.email] = req.body.email;
    values[colNames.password] = hashHelper.hashPassword(req.body.password);
    user.add(values,(result) => {
        //res.send(JSON.stringify(result));
        console.log(result.message);
        if(result.message === constants.response.SUCCESS ){
            res.render('login',{error: result.message,host_address :server_config.hosting_server_ip,port:server_config.port_no});
        }
        else{
            let error_code = result.message.errno;
            res.render('login',{error : error_code,host_address :server_config.hosting_server_ip,port:server_config.port_no});

        }
    });
});

module.exports = router;