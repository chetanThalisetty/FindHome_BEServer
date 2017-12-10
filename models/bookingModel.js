const dbConnectionPool = require('../utils/dbConnectionPool');
const db_config = require('../config/db_config');
const tInfo = require('../config/table_info');
const logger = require('../lib/logger');
const responseObj = require('../lib/response');


function bookHome(reqObj, response){
    const check_in_date =reqObj.body.check_in;
    const check_out_date = reqObj.body.check_out;
    const userID = reqObj.body.userID;
    const houseID = reqObj.body.houseID;

    if (check_in_date == undefined || check_out_date == undefined || userID == undefined || houseID == undefined){
        response(new responseObj('error', "Check the parameters passed"));
    }else {
        const queryStr = "INSERT INTO " +
                            db_config.database + "." + tInfo.BOOKING.tableName +
                            "(" + tInfo.BOOKING.columnName.HOUSE_ID + ", " + tInfo.BOOKING.columnName.USER_ID +
                            ", " + tInfo.BOOKING.columnName.START_DATE + ", " + tInfo.BOOKING.columnName.END_DATE + ") VALUES (" +
                            "'" + houseID + "', " +
                            "'" + userID + "', " +
                            "'" + check_in_date + "', " +
                            "'" + check_out_date + "'); ";
        const connectionObj = dbConnectionPool.pool(db_config.defaultDB);
        connectionObj.getConnection(function(error,connection){
            connection.beginTransaction(function(err){
                    if (err){
                        response(new responseObj('error', err));
                    }

                    connectionObj.query(queryStr, function (error, results, fields) {
                        if(error) {
                            return connection.rollback(function(){
                                logger.log('error', 'Error on Query ' + error.message);
                                response(new responseObj('error', error));
                            });
                        }else {
                            connection.commit(function(err){
                                if (err) {
                                    return connection.rollback(function() {
                                        logger.log('error', 'Error on Query ' + error.message);
                                        response(new responseObj('error', error));
                                    });
                                }
                                logger.log('info', 'Success on executing the query' + results.length);
                                response(new responseObj('success', results));
                            });
                        }
                    });
                });
            });
    }
}

module.exports = {"bookHome":bookHome};