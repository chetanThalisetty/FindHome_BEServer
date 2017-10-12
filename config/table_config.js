/**
 * Holds all table names and column names of the database
 * @author Chetan Sai Kumar Thalisetty [tchetan1@umbc.edu]
 *
 * @type {{USER: Object}} - userInfo table
 */
module.exports = {
    "USER": {
        "tableName" : "userinfo",
        "columnName" : {
            "fName":"firstName",
            "lName":"lastName",
            "email":"email",
            "password": "password",
            "dob": "dateOfBirth"
        }
    }
};