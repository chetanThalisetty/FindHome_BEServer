
const mysql = require('mysql');
const db_config = require('../config/db_config');
/**
 * creates a pool of connections which can be re-used.
 * very efficient when concurrent requests comes up.
 * @type {Pool}
 */
const pool_US = mysql.createPool({
    database: db_config.database,
    connectionLimit: db_config.connectionLimit,
    host: db_config.db_US.host,
    user: db_config.db_US.user,
    password: db_config.db_US.password
});

const pool_UK = mysql.createPool({
    database: db_config.database,
    connectionLimit: db_config.connectionLimit,
    host: db_config.db_UK.host,
    user: db_config.db_UK.user,
    password: db_config.db_UK.password
});

function getConnection(selector){
    selector = selector.toUpperCase();
    if (selector == db_config.defaultDB){
        return pool_UK;
    }else{
        return pool_US;
    }
}
module.exports = {"pool":getConnection};
