const tInfo = require('../config/table_info');

/**
 * Holds all table names and column names of the database
 * @author Chetan Sai Kumar Thalisetty [tchetan1@umbc.edu]
 *
 * @type {{USER: Object}} - userInfo table
 */
module.exports = {

    "BOOKING":{
        "tableName" : tInfo.BOOKING.tableName,
        "tableCreationQuery": "CREATE TABLE " + tInfo.BOOKING.tableName +
                                " ("+ tInfo.BOOKING.columnName.ID + " INT NOT NULL AUTO_INCREMENT," +
                                tInfo.BOOKING.columnName.HOUSE_ID + " VARCHAR(255) NOT NULL," +
                                tInfo.BOOKING.columnName.USER_ID + " INT NOT NULL," +
                                tInfo.BOOKING.columnName.START_DATE + " VARCHAR(255) NOT NULL," +
                                tInfo.BOOKING.columnName.END_DATE + " VARCHAR(255) NOT NULL," +
                                "PRIMARY KEY(" + tInfo.BOOKING.columnName.ID + "),"+
                                "FOREIGN KEY(" + tInfo.BOOKING.columnName.USER_ID + ") REFERENCES "+ tInfo.USER.tableName + "(" + tInfo.USER.columnName.ID + ")," +
                                "FOREIGN KEY(" + tInfo.BOOKING.columnName.HOUSE_ID + ") REFERENCES "+ tInfo.HOUSE.tableName + "(" + tInfo.HOUSE.columnName.ID + "))"
    },
    "USER":{
        "tableName" : tInfo.USER.tableName,
        "tableCreationQuery": "CREATE TABLE " + tInfo.USER.tableName +
                                "(" + tInfo.USER.columnName.ID + " INT NOT NULL AUTO_INCREMENT," +
                                tInfo.USER.columnName.email + " VARCHAR(255) UNIQUE NOT NULL, " +
                                tInfo.USER.columnName.password + " VARCHAR(255) NOT NULL, " +
                                "PRIMARY KEY(" + tInfo.USER.columnName.ID+ "))"
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
    "ADDRESS":{
        "tableName" : tInfo.ADDRESS.tableName,
        "tableCreationQuery": "CREATE TABLE " + tInfo.ADDRESS.tableName +
                                " ("+ tInfo.ADDRESS.columnName.ID + " VARCHAR(255) NOT NULL," +
                                tInfo.ADDRESS.columnName.NAME + " VARCHAR(255) NOT NULL," +
                                "PRIMARY KEY(" + tInfo.ADDRESS.columnName.ID + "))"
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
        "tableName" : tInfo.HOUSE.tableName,
        "tableCreationQuery":"CREATE TABLE " + tInfo.HOUSE.tableName +
                                " ("+ tInfo.HOUSE.columnName.ID + " VARCHAR(255) NOT NULL, " +
                                tInfo.HOUSE.columnName.NAME + " TEXT," +
                                tInfo.HOUSE.columnName.SUMMARY + " TEXT," +
                                tInfo.HOUSE.columnName.SPACE + " TEXT," +
                                tInfo.HOUSE.columnName.DESCRIPTION + " TEXT," +
                                tInfo.HOUSE.columnName.RULES + " TEXT," +
                                tInfo.HOUSE.columnName.HOST_ID + " VARCHAR(255) NOT NULL," +
                                tInfo.HOUSE.columnName.ADDRESS_ID + " VARCHAR(255) NOT NULL," +
                                tInfo.HOUSE.columnName.CITY_ID + " VARCHAR(255) NOT NULL," +
                                tInfo.HOUSE.columnName.STATE_ID + " VARCHAR(255) NOT NULL," +
                                tInfo.HOUSE.columnName.ZIPCODE + " INT(7)," +
                                tInfo.HOUSE.columnName.COUNTRY_ID + " VARCHAR(255) NOT NULL," +
                                tInfo.HOUSE.columnName.LATITUDE + " FLOAT(13,10)," +
                                tInfo.HOUSE.columnName.LONGITUDE + " FLOAT(13,10)," +
                                tInfo.HOUSE.columnName.PROPERTY_TYPE + " VARCHAR(255)," +
                                tInfo.HOUSE.columnName.ROOM_TYPE + " VARCHAR(255)," +
                                tInfo.HOUSE.columnName.ACCOMMODATES + " INT(7)," +
                                tInfo.HOUSE.columnName.BATHROOMS + " INT(7)," +
                                tInfo.HOUSE.columnName.BEDROOMS + " INT(7)," +
                                tInfo.HOUSE.columnName.BEDS + " INT(7)," +
                                tInfo.HOUSE.columnName.BED_TYPE + " VARCHAR(255)," +
                                tInfo.HOUSE.columnName.AMENITIES + " TEXT," +
                                tInfo.HOUSE.columnName.PRICE + " INT(255)," +
                                tInfo.HOUSE.columnName.SECURITY_DEPOSIT + " INT(255)," +
                                tInfo.HOUSE.columnName.GUESTS_INCLUDED + " INT(255)," +
                                tInfo.HOUSE.columnName.EXTRA_PEOPLE + " INT(255)," +
                                tInfo.HOUSE.columnName.MINIMUM_NIGHTS + " INT(255)," +
                                tInfo.HOUSE.columnName.MAXIMUM_NIGHTS + " INT(255)," +
                                tInfo.HOUSE.columnName.CANCELLATION_POLICY + " VARCHAR(255)," +
                                "PRIMARY KEY("+ tInfo.HOUSE.columnName.ID +"),"+
                                "FOREIGN KEY(" + tInfo.HOUSE.columnName.HOST_ID + ") REFERENCES "+ tInfo.HOST.tableName + "(" + tInfo.HOST.columnName.ID + ")," +
                                "FOREIGN KEY(" + tInfo.HOUSE.columnName.ADDRESS_ID + ") REFERENCES "+ tInfo.ADDRESS.tableName + "(" + tInfo.ADDRESS.columnName.ID + ")," +
                                "FOREIGN KEY(" + tInfo.HOUSE.columnName.CITY_ID + ") REFERENCES "+ tInfo.CITY.tableName + "(" + tInfo.CITY.columnName.ID + ")," +
                                "FOREIGN KEY(" + tInfo.HOUSE.columnName.COUNTRY_ID + ") REFERENCES "+ tInfo.COUNTRY.tableName + "(" + tInfo.COUNTRY.columnName.ID + ")," +
                                "FOREIGN KEY(" + tInfo.HOUSE.columnName.STATE_ID + ") REFERENCES "+ tInfo.STATE.tableName + "(" + tInfo.STATE.columnName.ID +"))"
    }
};