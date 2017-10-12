const express = require('express');
const hashHelper = require('../lib/hash');
const user = require('../components/userInfo');
const table_config = require('../config/table_config');
const router = express.Router();

/**
 * gets the request for User SignUp. Express router helps to seperate the modules.
 * Request body should have
 * FirstName
 * LastName
 * EmailID : this is used for the next login
 * Password: hashing has to be done for encryption purposes
 * Date of Birth: just in case we need to calculate the age
 * ---------------------------------------------------------------
 * Note: Here route.all is used as it can accept both get and post requests
 * ----------------------------------------------------------------
 * @example:
 * curl -v -H "Content-Type: application/json"
 * -d '{"firstName": "Chetan Sai Kumar", "lastName":"Thalisetty", "emailID": "tchetan1@umbc.edu", "password": "6672164781", "dob":"01/02/1993"}'
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
    let colNames = table_config.USER.columnName;
    values[colNames.fName] = req.body.firstname;
    values[colNames.lName] = req.body.lastname;
    values[colNames.email] = req.body.email;
    values[colNames.dob] = req.body.dob;
    values[colNames.password] = hashHelper.hashPassword(req.body.password);
    user.add(values,(result) => {
        res.send(JSON.stringify(result));
    });
});

module.exports = router;