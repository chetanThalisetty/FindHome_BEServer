const tInfo = require('../config/table_info');

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
            "ID": "userID",
            "fName":"firstName",
            "lName":"lastName",
            "email":"email",
            "password": "password",
            "dob": "dateOfBirth"
        }
    },
    "COUNTRY":{
        "tableName" : tInfo.COUNTRY.tableName,
        "tableCreationQuery": "CREATE TABLE " + tInfo.COUNTRY.tableName +
                                " ("+ tInfo.COUNTRY.columnName.ID + " VARCHAR(255) NOT NULL," +
                                tInfo.COUNTRY.columnName.NAME + " VARCHAR(255) NOT NULL," +
                                "PRIMARY KEY(" + tInfo.COUNTRY.columnName.ID + "))"
    },
    "STATE":{
        "tableName" : tInfo.STATE.tableName,
        "tableCreationQuery": "CREATE TABLE " + tInfo.STATE.tableName +
        " ("+ tInfo.STATE.columnName.COUNTRY_ID + " VARCHAR(255) NOT NULL," +
        tInfo.STATE.columnName.ID + " VARCHAR(255) NOT NULL," +
        tInfo.STATE.columnName.NAME + " VARCHAR(255) NOT NULL," +
        "PRIMARY KEY(" + tInfo.STATE.columnName.ID + "),"+
        "FOREIGN KEY(" + tInfo.STATE.columnName.COUNTRY_ID + ") REFERENCES "+ tInfo.COUNTRY.tableName + "(" + tInfo.COUNTRY.columnName.ID + "))"
    },
    "CITY":{
        "tableName" : tInfo.CITY.tableName,
        "tableCreationQuery": "CREATE TABLE " + tInfo.CITY.tableName +
        " ("+ tInfo.CITY.columnName.ID + " VARCHAR(255) NOT NULL," +
        tInfo.CITY.columnName.NAME + " VARCHAR(255) NOT NULL," +
        tInfo.CITY.columnName.COUNTRY_ID + " VARCHAR(255) NOT NULL," +
        tInfo.CITY.columnName.STATE_ID + " VARCHAR(255) NOT NULL," +
        "PRIMARY KEY(" + tInfo.CITY.columnName.ID + "),"+
        "FOREIGN KEY(" + tInfo.CITY.columnName.COUNTRY_ID + ") REFERENCES "+ tInfo.COUNTRY.tableName + "(" + tInfo.COUNTRY.columnName.ID + ")," +
        "FOREIGN KEY(" + tInfo.CITY.columnName.STATE_ID + ") REFERENCES "+ tInfo.STATE.tableName + "(" + tInfo.STATE.columnName.ID +"))"
    },
    "HOST":{
        "tableName" : tInfo.HOST.tableName,
        "tableCreationQuery": "CREATE TABLE " + tInfo.HOST.tableName +
        " ("+ tInfo.HOST.columnName.ID + " VARCHAR(255) NOT NULL," +
        tInfo.HOST.columnName.NAME + " VARCHAR(255) NOT NULL," +
        tInfo.HOST.columnName.LOCATION + " TEXT," +
        tInfo.HOST.columnName.ABOUT + " TEXT," +
        tInfo.HOST.columnName.RESPONSE_TIME + " VARCHAR(255)," +
        tInfo.HOST.columnName.RESPONSE_RATE + " VARCHAR(10)," +
        tInfo.HOST.columnName.IS_SUPERHOST + " VARCHAR(5)," +
        tInfo.HOST.columnName.THUMBNAIL_URL + " TEXT," +
        tInfo.HOST.columnName.PICTURE_URL + " TEXT," +
        tInfo.HOST.columnName.HAS_PROFILE_PIC + " VARCHAR(5)," +
        tInfo.HOST.columnName.IS_IDENTITY_VERIFIED + " VARCHAR(5)," +
        "PRIMARY KEY(" + tInfo.HOST.columnName.ID +"))"
    },
    "HOUSE": {
        "tableName" : "houseInfo",
        "tableCreationQuery":"CREATE TABLE houseInfo (house_id VARCHAR(255) NOT NULL, " +
                                                        "name VARCHAR(2048) NOT NULL," +
                                                        "summary VARCHAR(2048)," +
                                                        "space VARCHAR(2048)," +
                                                        "description VARCHAR(2048)," +
                                                        "house_rules VARCHAR(2048)," +
                                                        "host_id VARCHAR(255)," +
                                                        "address_id VARCHAR(255)," +
                                                        "city_id VARCHAR(255)," +
                                                        "state_id VARCHAR(255)," +
                                                        "zipcode INT(7)," +
                                                        "country_id VARCHAR(255)," +
                                                        "latitude FLOAT(13,10)," +
                                                        "longitude FLOAT(13,10)," +
                                                        "property_type VARCHAR(255)," +
                                                        "room_type VARCHAR(255)," +
                                                        "accommodates INT(7)," +
                                                        "bathrooms INT(7)," +
                                                        "bedrooms INT(7)," +
                                                        "beds INT(7)," +
                                                        "bed_type VARCHAR(255)," +
                                                        "amenities VARCHAR(2048)," +
                                                        "price INT(255)," +
                                                        "security_deposit INT(255)," +
                                                        "guests_included INT(255)," +
                                                        "extra_people INT(255)," +
                                                        "minimum_nights INT(255)," +
                                                        "maximum_nights INT(255)," +
                                                        "cancellation_policy VARCHAR(255)," +
                                                        "PRIMARY KEY(houseId)"+
                                                        "FOREIGN KEY(host_id) REFERENCES hostInfo(host_id)," +
                                                        "FOREIGN KEY(address_id) REFERENCES addressInfo(address_id)," +
                                                        "FOREIGN KEY(city_id) REFERENCES cityInfo(city_id)," +
                                                        "FOREIGN KEY(state_id) REFERENCES stateInfo(state_id)" +
                                                        "FOREIGN KEY(country_id) REFERENCES countryInfo(country_id))"
    }
};