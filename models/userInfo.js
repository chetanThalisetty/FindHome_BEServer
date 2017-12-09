const db_pool = require('../utils/dbConnectionPool');
const logger = require('../lib/logger');
const table_info = require('../config/table_info');
const responseObj = require('../lib/response');
const db_config = require('../config/db_config');

/**
 * userInfo
 *
 * Holds all the interactions related to the user
 * @author Chetan Sai Kumar Thalisetty [tchetan1@umbc.edu]
 */

exports.fetchByCols =function (fields,cond,cb){
    // const condition = table_info.USER.columnName.email + " = '" + cond + "'";
    let selectClause = "SELECT ";
    let i=0;
    for(i  = 0 ; i < fields.length-1; i++){
        selectClause = selectClause + fields[i]+", ";
    }
    if(fields.length > 0){
        selectClause = selectClause+fields[i];
    }
    const finalQuery = selectClause + " FROM "+
                        db_config.database+ "." + table_info.USER.tableName +
                        " WHERE "+cond+";";
    logger.log('info','about to execute the Query '+finalQuery);
    console.log('about to execute the Query '+finalQuery);
    db_pool.pool(db_config.defaultDB).query(finalQuery,function(err,rows,fileds){
        if(err){
            logger.log('info','Query Execution Failed '+err);
            console.log('Query Execution Failed '+err);
            cb(err);
        }else{
            cb(null,rows);
        }
    });
}

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
    const queryStr = "INSERT INTO " + table_info.USER.tableName + cols + " " + vals;
    logger.log('info', 'Executing Query ' + queryStr);
    db_pool.pool(db_config.defaultDB).query(queryStr, function (error, results, fields) {
        if(error) {
            logger.log('error', 'Error on Query ' + error.message);
            response(new responseObj('error', error));
        }else {
            logger.log('info', 'Success on executing the query');
            response(new responseObj('success', results[0]));
        }
    });
};