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
        "tableName" : "countryInfo",
        "columnName" : {
            "ID": "countryId",
            "NAME":"countryName"
        }
    },
    "STATE":{
        "tableName" : "stateInfo",
        "columnName" : {
            "COUNTRY_ID":"countryId",
            "ID": "stateId",
            "NAME":"stateName"
        }
    },
    "CITY":{
        "tableName" : "cityInfo",
        "columnName" : {
            "ID": "cityId",
            "NAME":"cityName",
            "COUNTRY_ID":"countryId",
            "STATE_ID":"stateId"
        }
    },
    "HOST":{
        "tableName" : "hostInfo",
        "columnName" : {
            "ID": "host_id",
            "NAME":"host_name",
            "LOCATION":"host_location",
            "ABOUT":"host_about",
            "RESPONSE_TIME":"host_response_time",
            "RESPONSE_RATE":"host_response_rate",
            "IS_SUPERHOST":"host_is_superhost",
            "THUMBNAIL_URL":"host_thumbnail_url",
            "PICTURE_URL":"host_picture_url",
            "VERIFICATIONS":"host_verifications",
            "HAS_PROFILE_PIC":"host_has_profile_pic",
            "IS_IDENTITY_VERIFIED":"host_identity_verified"
        }
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