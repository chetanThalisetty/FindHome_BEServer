
const tableConfig = require('../config/table_config');

/**
 * Holds all csv absolute paths of the data
 * @author Chetan Sai Kumar Thalisetty [tchetan1@umbc.edu]
 *
 */
module.exports = {
    "loadFromCSV":[
        {
            "tablePath":'../csvFiles/CountryFile.csv',
            "tableObj":tableConfig.COUNTRY
        },
        {
            "tablePath":'../csvFiles/StateFile.csv',
            "tableObj":tableConfig.STATE
        },
        {
            "tablePath":'../csvFiles/CityFile.csv',
            "tableObj":tableConfig.CITY
        },
        {
            "tablePath":'../csvFiles/StreetFile.csv',
            "tableObj":tableConfig.ADDRESS
        },
        {
            "tablePath":'../csvFiles/HostFile.csv',
            "tableObj":tableConfig.HOST
        },
        {
            "tablePath":'../csvFiles/HouseFile.csv',
            "tableObj":tableConfig.HOUSE
        },
    ]
};