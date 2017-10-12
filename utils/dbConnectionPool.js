
const mysql = require('mysql');
const db_config = require('../config/db_config');
/**
 * creates a pool of connections which can be re-used.
 * very efficient when concurrent requests comes up.
 * @type {Pool}
 */
const pool = mysql.createPool({
    database: db_config.database,
    connectionLimit: db_config.connectionLimit,
    host: db_config.host,
    user: db_config.user,
    password: db_config.password
});

module.exports = pool;
