const tInfo = require('../config/table_info');
const db_pool = require('../utils/dbConnectionPool');
const db_config = require('../config/db_config');
const logger = require('../lib/logger');
const responseObj = require('../lib/response');
const constants = require('../utils/constants');

function getHomes(reqObj, response){
    const houseTAlias = constants.HOUSEINFOALIAS;
    const hostTAlias = constants.HOSTINFOALIAS;
    const cityTAlias = constants.CITYINFOALIAS;

    const check_in_date =reqObj.body.check_in;
    const check_out_date = reqObj.body.check_out;
    const people_count = reqObj.body.people;
    const entire_home = reqObj.body.entire_home;
    const private_room = reqObj.body.private_room;
    const start_price = reqObj.body.start_price;
    const end_price = reqObj.body.end_price;
    const bed_count = reqObj.body.beds;
    const bedroom_count = reqObj.body.bedrooms;
    const bathroom_count = reqObj.body.bathrooms;
    const shouldBeSuperHost = reqObj.body.superhost;
    const city = reqObj.body.city;
    const state = reqObj.body.state;
    const country = reqObj.body.country;

    // Formatting the date string
    if (check_in_date) {
        let start_date = check_in_date.split("-");
        start_date = new Date(start_date[0],start_date[1]-1,start_date[2]);

        let end_date;
        if (check_out_date) {
            end_date = check_out_date.split("-");
            end_date = new Date(end_date[0],end_date[1]-1,end_date[2]);
        }else {
            end_date = new Date(start_date[0],start_date[1]-1, start_date[2]);
            end_date.setDate(end_date.getDate()+3);
        }
        let start_str = format(start_date);
        let end_str = format(end_date);

        const guestCountStr = generateGuestCountStr(people_count) + " ";
        const cityCompareStr = generateCityCompareStr(city.toUpperCase());
        const homeTypeStr = generateHomeTypeStr(entire_home,private_room);
        const priceTypeStr = generatePriceRangeStr(start_price,end_price);
        const bedCountStr = generateBedCountStr(bed_count) + " ";
        const bedRoomCountStr = generateBedroomCountStr(bedroom_count) + " ";
        const bathRoomCountStr = generateBathroomCountStr(bathroom_count) + " ";
        const superHostStr = generateSuperHostStr(shouldBeSuperHost);

        // let queryString = "SELECT houseId,houseName,housePrice,houseSummary " +
        //                     "FROM dbName.houseTableName AS houseTableAlias, dbName.hostTableName AS hostTableAlias, dbName.cityTableName AS cityTableAlias " +
        //                     "WHERE " +
        //                     "houseTableAlias.houseHostID = hostTableAlias.hostId AND " +
        //                     "houseTableAlias.houseCityID = cityTableAlias.cityId AND " +
        //                     "peopleColumnName >= guestCount AND " + homeTypeStr + " AND " + priceTypeStr + "AND " +
        //                     "bedColumnName >= " + bedsNum + " AND bedRoomColumnName >= " + bedRoomNum + " AND bathRoomColumnName >= " + bathRoomNum +  superHostStr + cityCompareStr;

        let queryString = "SELECT houseId,houseName,housePrice,houseSummary " +
            "FROM dbName.houseTableName AS houseTableAlias  " +
            "INNER JOIN dbName.hostTableName AS hostTableAlias ON houseTableAlias.houseHostID = hostTableAlias.hostId " +
            "INNER JOIN dbName.cityTableName AS cityTableAlias ON houseTableAlias.houseCityID = cityTableAlias.cityId " +
            "WHERE " + cityCompareStr +
            guestCountStr +
            bedCountStr +
            bedRoomCountStr +
            bathRoomCountStr +
            homeTypeStr +
            priceTypeStr +
            superHostStr +
            " LIMIT 100";

        queryString = queryString.replace(/dbName/g,db_config.database);
        queryString = queryString.replace('houseTableName',tInfo.HOUSE.tableName);
        queryString = queryString.replace(/houseTableAlias/g,houseTAlias);
        queryString = queryString.replace('hostTableName',tInfo.HOST.tableName);
        queryString = queryString.replace(/hostTableAlias/g,hostTAlias);
        queryString = queryString.replace('cityTableName',tInfo.CITY.tableName);
        queryString = queryString.replace(/cityTableAlias/g,cityTAlias);
        queryString = queryString.replace('houseHostID',tInfo.HOUSE.columnName.HOST_ID);
        queryString = queryString.replace('hostId',tInfo.HOST.columnName.ID);
        queryString = queryString.replace('houseCityID',tInfo.HOUSE.columnName.CITY_ID);
        queryString = queryString.replace('cityId',tInfo.CITY.columnName.ID);
        queryString = queryString.replace('houseId',houseTAlias + "." + tInfo.HOUSE.columnName.ID);
        queryString = queryString.replace('houseName',houseTAlias + "." + tInfo.HOUSE.columnName.NAME);
        queryString = queryString.replace('housePrice',houseTAlias + "." + tInfo.HOUSE.columnName.PRICE);
        queryString = queryString.replace('houseSummary',houseTAlias + "." + tInfo.HOUSE.columnName.SUMMARY);

        console.log(queryString);

        logger.log('info', 'Executing Query ' + queryString);
        db_pool.query(queryString, function (error, results, fields) {
            if(error) {
                logger.log('error', 'Error on Query ' + error.message);
                response(new responseObj('error', error));
            }else {
                logger.log('info', 'Success on executing the query' + results.length);
                response(new responseObj('success', results));
            }
        });

    }else {
        //TODO throw error
        response(new responseObj('error', "Check in date is not provided"));
    }
}

function generateBathroomCountStr(bathroomCount){
    const bCount = parseInt(bathroomCount);
    let resultStr = " AND (";
    const tColumnName = constants.HOUSEINFOALIAS + "."+ tInfo.HOUSE.columnName.BATHROOMS;

    if (!isNaN(bCount) && bCount > 0){
        resultStr = resultStr + tColumnName + " >= " + bCount + ") ";
    }else {
        resultStr = " ";
    }
    return resultStr;
}

function generateBedroomCountStr(bedroomCount){
    const bCount = parseInt(bedroomCount);
    let resultStr = " AND (";
    const tColumnName = constants.HOUSEINFOALIAS + "."+ tInfo.HOUSE.columnName.BEDROOMS;

    if (!isNaN(bCount) && bCount > 0){
        resultStr = resultStr + tColumnName + " >= " + bCount + ") ";
    }else {
        resultStr = " ";
    }
    return resultStr;
}


function generateBedCountStr(bedCount){
    const bCount = parseInt(bedCount);
    let resultStr = " AND (";
    const tColumnName = constants.HOUSEINFOALIAS + "."+ tInfo.HOUSE.columnName.BEDS;

    if (!isNaN(bCount) && bCount > 0){
        resultStr = resultStr + tColumnName + " >= " + bCount + ") ";
    }else {
        resultStr = " ";
    }
    return resultStr;
}

function generateGuestCountStr(guestCount){
    const gCount = parseInt(guestCount);
    let resultStr = " AND (";
    const tColumnName = constants.HOUSEINFOALIAS + "."+ tInfo.HOUSE.columnName.ACCOMMODATES;

    if (!isNaN(gCount) && gCount > 0){
        resultStr = resultStr + tColumnName + " >= " + gCount + ") ";
    }else {
        resultStr = " ";
    }
    return resultStr;
}

/**
 * Generates the Home type constraint for select statement. If both null or false is considered as both true
 * @param entireHome - can be true or null
 * @param privateRoom - can be true or null
 * @returns {string} - returns the string of this format (room_type= 'Entire home/apt' OR room_type= 'Private room')
 */
function generateHomeTypeStr(entireHome, privateRoom){

    let resultStr = " AND (";
    const tColumnName = constants.HOUSEINFOALIAS + "."+ tInfo.HOUSE.columnName.ROOM_TYPE;

    if ((entireHome == undefined && privateRoom == undefined)){
        resultStr = " ";
    }else if (entireHome == "true" && privateRoom == "true"){
        resultStr = resultStr + tColumnName + "= '" +  constants.HOME_TYPES.ENTIRE_HOME + "' OR ";
        resultStr = resultStr + tColumnName + "= '" +  constants.HOME_TYPES.PRIVATE_ROOM + "')";
    }
    else if(entireHome == "true"){
        resultStr = resultStr + tColumnName + "= '" +  constants.HOME_TYPES.ENTIRE_HOME + "')";
    } else if (privateRoom == "true"){
        resultStr = resultStr + tColumnName + "= '" +  constants.HOME_TYPES.PRIVATE_ROOM + "')";
    }

    return resultStr;
}

/**
 * Generates the price range condition that can be used for selecting query
 * @param start_price
 * @param end_price
 * @returns {string}
 */
function generatePriceRangeStr(start_price, end_price){
    let resultStr = " AND (";
    const tColumnName = constants.HOUSEINFOALIAS + "."+ tInfo.HOUSE.columnName.PRICE;
    sPrice = parseInt(start_price);
    ePrice = parseInt(end_price);

    if(isNaN(sPrice) && isNaN(ePrice)){
        resultStr = " ";
    }else {
        if(!isNaN(sPrice)) {
            resultStr = resultStr + tColumnName + ">=" + sPrice;
        }

        if(!isNaN(sPrice) && !isNaN(ePrice) && ePrice > sPrice){
            resultStr = resultStr + " AND " + tColumnName + "<=" + ePrice;
        }
        resultStr = resultStr + ") ";
    }
    return resultStr;
}

/**
 * Generating the string based on the super host
 * @param shouldBeSuperHost
 * @returns {string}
 */
function generateSuperHostStr(shouldBeSuperHost){

    let resultStr = " AND (";
    const tColumnName = constants.HOSTINFOALIAS + "."+ tInfo.HOST.columnName.IS_SUPERHOST;

    if(shouldBeSuperHost && shouldBeSuperHost == "true"){
        resultStr = resultStr + tColumnName + "= '"+ constants.SUPER_HOST.true +"') ";
    }else {
        resultStr = "";
    }
    return resultStr;
}

function generateCityCompareStr(city){
    let resultStr = " (upper(";
    const tColumnName = constants.CITYINFOALIAS + "."+ tInfo.CITY.columnName.NAME + ") ";
    if (city){
        resultStr = resultStr + tColumnName + "= '"+ city +"') ";
    }else {
        resultStr = "";
    }
    return resultStr;
}
/**
 * Formats the date in the format YYYY:MM:DD HH:MM:SS
 * @param date
 * @returns {string}
 */
function format(date){
    let format_str = "";
    format_str = format_str+date.getFullYear();

    if(date.getMonth()+1 < 10){
        format_str = format_str+"-"+"0"+(date.getMonth()+1);
    }else{
        format_str = format_str+"-"+(date.getMonth()+1);
    }

    if(date.getDate() < 10){
        format_str = format_str+"-"+"0"+(date.getDate());
    }else{
        format_str = format_str+"-"+(date.getDate());
    }

    if(date.getHours()<10){
        format_str = format_str+" "+"0"+(date.getHours());
    }else{
        format_str = format_str+" "+(date.getHours());
    }

    if(date.getMinutes() < 10){
        format_str = format_str+":"+"0"+(date.getMinutes());
    }else{
        format_str = format_str+":"+(date.getMinutes());
    }

    if(date.getSeconds() < 10){
        format_str = format_str+":"+"0"+(date.getSeconds());
    }else{
        format_str = format_str+":"+(date.getSeconds());
    }
    return format_str;
}

module.exports = {"getHomes":getHomes};