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
    db_US:{
        "host": '10.200.146.130',
        "user": 'chetan',
        "password": 'chetan',
    },
    db_UK:{
        "host": '10.200.1.25',
        "user": 'chetan',
        "password": 'chetan',
    },
    "database": 'findHome',
    "connectionLimit": 100,
<<<<<<< HEAD
    "defaultDB" : "CHICAGOSS"
=======
    "defaultDB" : "CHICAGO"
>>>>>>> made some changes in controllers ,dbconfig file, userInfo
};