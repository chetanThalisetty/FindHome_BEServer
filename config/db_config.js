/**
 * @author: Chetan Sai Kumar Thalisetty
 *
 * configuration parameters for the db configuration.
 * ----------------------------------------------------------
 * Note: Password is not set for root by default. If needed can be updated using the sql command
 * mysql> update user set password=PASSWORD("root") where User='root';
 * mysql> flush privileges;
 * mysql> quit
 * ----------------------------------------------------------
 * ConnectionLimit is very important as it handles the multiple request to the database
 * -----------------------------------------------------------
 * @type {{host: string, user: string, password: string}}
 */
module.exports = {
    "host": 'localhost',
    "user": 'root',
    "password": '',
    "database": 'findhome',
    "connectionLimit": 100
};