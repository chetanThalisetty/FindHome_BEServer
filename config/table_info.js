/**
 * Holds all table names and column names of the database
 * @author Chetan Sai Kumar Thalisetty [tchetan1@umbc.edu]
 *
 * @type {{USER: Object}} - userInfo table
 */
module.exports = {
    "BOOKING": {
        "tableName" : "bookedinfo",
        "columnName" : {
            "ID": "bookingID",
            "HOUSE_ID":"houseID",
            "USER_ID": "userID",
            "START_DATE": "startDate",
            "END_DATE": "endDate"
        }
    },
    "USER": {
        "tableName" : "userinfo",
        "columnName" : {
            "ID": "userID",
            "email":"email",
            "password": "password"
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
    "ADDRESS":{
        "tableName" : "addressInfo",
        "columnName" : {
            "ID": "address_id",
            "NAME":"address"
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
        "columnName":{
            "ID":"houseId",
            "NAME":"name",
            "SUMMARY":"summary",
            "SPACE":"space",
            "DESCRIPTION":"description",
            "RULES":"house_rules",
            "HOST_ID":"host_id",
            "ADDRESS_ID":"address",
            "CITY_ID":"city",
            "STATE_ID":"state",
            "ZIPCODE":"zipcode",
            "COUNTRY_ID":"country",
            "LATITUDE":"latitude",
            "LONGITUDE":"longitude",
            "PROPERTY_TYPE":"property_type",
            "ROOM_TYPE":"room_type",
            "ACCOMMODATES":"accommodates",
            "BATHROOMS":"bathrooms",
            "BEDROOMS":"bedrooms",
            "BEDS":"beds",
            "BED_TYPE":"bed_type",
            "AMENITIES":"amenities",
            "PRICE":"price",
            "SECURITY_DEPOSIT":"security_deposit",
            "GUESTS_INCLUDED":"guests_included",
            "EXTRA_PEOPLE":"extra_people",
            "MINIMUM_NIGHTS":"minimum_nights",
            "MAXIMUM_NIGHTS":"maximum_nights",
            "CANCELLATION_POLICY":"cancellation_policy"
        },
    }
};