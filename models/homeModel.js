const constants = require('../utils/constants');
const tInfo = require('../config/table_info');
const db_pool = require('../utils/dbConnectionPool');
const db_config = require('../config/db_config');
const logger = require('../lib/logger');
const responseObj = require('../lib/response');

/**
 * @author Chetan Thalisetty [tchetan1@umbc.edu]
 */

/**
 * Tries to connect to database and retrieve the information for a houseID received
 * @param reqObj - object containing the requests of the user
 * @param response - gives the table row of the specified houseid
 */
function getHomeInfo(reqObj, response){
    const houseTAlias = constants.HOUSEINFOALIAS;
    const hostTAlias = constants.HOSTINFOALIAS;

    const houseID = reqObj.body.house_id;

    if(houseID){
        let queryString = "SELECT * " +
            "FROM dbName.houseTableName AS houseTableAlias  " +
            "INNER JOIN dbName.hostTableName AS hostTableAlias ON houseTableAlias.houseHostID = hostTableAlias.hostId " +
            "WHERE " +
            "houseTableAlias.houseID = 'hID'";

        queryString = queryString.replace(/dbName/g,db_config.database);
        queryString = queryString.replace('houseTableName',tInfo.HOUSE.tableName);
        queryString = queryString.replace(/houseTableAlias/g,houseTAlias);
        queryString = queryString.replace('hostTableName',tInfo.HOST.tableName);
        queryString = queryString.replace(/hostTableAlias/g,hostTAlias);
        queryString = queryString.replace(/houseID/g,tInfo.HOUSE.columnName.ID);
        queryString = queryString.replace(/hID/g,houseID);
        queryString = queryString.replace('houseHostID',tInfo.HOUSE.columnName.HOST_ID);
        queryString = queryString.replace('hostId',tInfo.HOST.columnName.ID);

        console.log(queryString);

        logger.log('info', 'Executing Query ' + queryString);
        db_pool.query(queryString, function (error, results, fields) {
            if(error) {
                logger.log('error', 'Error on Query ' + error.message);
                response(new responseObj('error', error));
            }else {
                logger.log('info', 'Success on executing the query' + results.length);
                response(new responseObj('success', results));
            }
        });
    }else{
        //TODO throw error
    }
}

module.exports = {"getCompleteHouseInfo":getHomeInfo};