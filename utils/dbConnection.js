const mySql = require('mysql');
const db_config = require('../config/db_config');

/**
 * export the db_con variable holding the mysql single connection.
 * All the DB configurations are provided my db_config.
 * @type {Connection}
 */
const db_con = mySql.createConnection({
    database: db_config.database,
    host: db_config.host,
    user: db_config.user,
    password: db_config.password
});

module.exports = db_con;
