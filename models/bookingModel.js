const dbConnectionPool = require('../utils/dbConnectionPool');
const db_config = require('../config/db_config');
const tInfo = require('../config/table_info');
const logger = require('../lib/logger');
const responseObj = require('../lib/response');
const constants = require('../utils/constants');


function bookHome(reqObj, response){
    let check_in_date;
    let check_out_date;
    let userID;
    let houseID;

    // checking for session obj
    let cityComparator = db_config.defaultDB;

    if(reqObj.session.views && reqObj.session.passport){
        check_in_date = reqObj.session.views[constants.SESSION.CHECK_IN];
        check_out_date = reqObj.session.views[constants.SESSION.CHECK_OUT];
        userID = reqObj.session.passport['user'];
        houseID = reqObj.session.views[constants.SESSION.HOUSE_ID];
        cityComparator = reqObj.session.views[constants.SESSION.CITY];
    }
    // const check_in_date =reqObj.body.check_in;
    // const check_out_date = reqObj.body.check_out;
    // const userID = reqObj.body.userID;
    // const houseID = reqObj.body.houseID;

    if (check_in_date == undefined || check_out_date == undefined || userID == undefined || houseID == undefined || cityComparator == undefined){
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
        const connectionObj = dbConnectionPool.pool(cityComparator);
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

                                results[constants.SESSION.CHECK_IN] = check_in_date;
                                results[constants.SESSION.CHECK_OUT] = check_out_date;
                                results.email = reqObj.user.email;
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