const db_pool = require('../utils/dbConnectionPool');
const logger = require('../lib/logger');
const table_config = require('../config/table_config');
const responseObj = require('../lib/response');

/**
 * userInfo
 *
 * Holds all the interactions related to the user
 * @author Chetan Sai Kumar Thalisetty [tchetan1@umbc.edu]
 */


/**
 * Adds the user info to the user table
 * @param userInfo - object holding the column names and values of the user
 * @param response - response object to send information about query execution
 */
exports.add = function (userInfo, response) {
    let cols = "(";
    let vals = "VALUES (";
    const entryKeys = Object.keys(userInfo);
    let i = 0;
    for(i = 0 ; i < entryKeys.length-1; i++){
        cols = cols + entryKeys[i]+", ";
        vals = vals + "'" + userInfo[entryKeys[i]]+ "', ";
    }

    //after last element comma shouldn't be there, so separate module
    if( entryKeys.length > 0){
        cols = cols + entryKeys[i];
        vals = vals + "'" + userInfo[entryKeys[i]] + "'";
    }
    cols = cols + ") ";
    vals = vals + ") ;";
    const queryStr = "INSERT INTO " + table_config.USER.tableName + cols + " " + vals;
    logger.log('info', 'Executing Query ' + queryStr);
    db_pool.query(queryStr, function (error, results, fields) {
        if(error) {
            logger.log('error', 'Error on Query ' + error.message);
            response(new responseObj('error', error));
        }else {
            logger.log('info', 'Success on executing the query');
            response(new responseObj('success', results[0]));
        }
    });
};