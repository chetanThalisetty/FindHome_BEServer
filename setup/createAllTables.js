const db_con = require('../utils/dbConnection');
const table_config = require('../config/table_config');
const logger = require('../lib/logger');
const log_config = require('../config/log_config');

/**
 * createAllTables
 * responsible to create the tables.
 * All the table names and column names of the table are received from the table_Config
 * @author Chetan Sai Kumar Thalisetty [tchetan1@umbc.edu]
 */
const user = table_config.USER;
const userCols = user.columnName;
const tableQueries = [
    "CREATE TABLE " + user.tableName + "(" + userCols.ID + " INT(9) NOT NULL auto_increment, " + userCols.fName + " VARCHAR(255) NOT NULL, " + userCols.lName + " VARCHAR(255) NOT NULL, " + userCols.email + " VARCHAR(255) UNIQUE NOT NULL, " + userCols.password + " VARCHAR(255) NOT NULL, " + userCols.dob + " VARCHAR(255) NOT NULL, PRIMARY KEY(" + userCols.ID+ "))"
];

const createTables = () => {
    const queryCount = tableQueries.length;
    for (let i = 0; i< queryCount; i++) {
        const sqlQuery = tableQueries[i];
        logger.log(log_config.infoLevel, "Executing Query " + sqlQuery);
        db_con.query(tableQueries[i], (err, result) => {
            if(err) {
                logger.log(log_config.errorLevel, err);
            } else{
                logger.log(log_config.infoLevel, result);
            }
        });
    }
};

createTables();



