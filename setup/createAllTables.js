const db_conPool = require('../utils/dbConnectionPool');
const table_config = require('../config/table_config');
const logger = require('../lib/logger');
const log_config = require('../config/log_config');
const db_config = require('../config/db_config');

/**
 * createAllTables
 * responsible to create the tables.
 * All the table names and column names of the table are received from the table_Config
 * @author Chetan Sai Kumar Thalisetty [tchetan1@umbc.edu]
 */

const tableQueries = [
    table_config.USER.tableCreationQuery,
    table_config.BOOKING.tableCreationQuery
];

const createTables = () => {
    const queryCount = tableQueries.length;
    for (let i = 0; i< queryCount; i++) {
        const sqlQuery = tableQueries[i];
        logger.log(log_config.infoLevel, "Executing Query " + sqlQuery);
        db_conPool.pool(db_config.defaultDB).query(tableQueries[i], (err, result) => {
            if(err) {
                logger.log(log_config.errorLevel, err);
            } else{
                logger.log(log_config.infoLevel, result);
            }
        });
    }
};

createTables();



