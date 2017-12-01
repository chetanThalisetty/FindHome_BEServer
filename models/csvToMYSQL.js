
const csvHelper = require('../workers/csvHelper');
const tableConfig = require('../config/table_config');
const csvConfig = require('../config/csv_config');

/**
 * csvToMYSQL
 *
 * Loads the CSV data to the database connected
 * @Dependencies many dependencies are used for this purpose
 * @author Chetan Sai Kumar Thalisetty [tchetan1@umbc.edu]
 **/

csvHelper.loadCSV2DB(csvConfig.hostTablePath,tableConfig.HOST,(result)=>{console.log(result.message)});
