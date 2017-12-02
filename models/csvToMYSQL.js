
const csvHelper = require('../workers/csvHelper');
const csvConfig = require('../config/csv_config');

/**
 * csvToMYSQL
 *
 * Loads the CSV data to the database connected
 * @Dependencies many dependencies are used for this purpose
 * @author Chetan Sai Kumar Thalisetty [tchetan1@umbc.edu]
 **/

// csvHelper.loadCSV2DB(csvConfig.houseTablePath,tableConfig.HOUSE,(result)=>{console.log(result.message)});

// exports.dumpCSV2DB = function(){
//     const csvArr = csvConfig.loadFromCSV;
//     csvArr.forEach(csvObj =>{
//         csvHelper.loadCSV2DB(csvObj.tablePath,csvObj.tableObj,(result)=>{console.log(result.message)});
//     });
// };

const csvArr = csvConfig.loadFromCSV;
// csvArr.forEach(csvObj =>{
//     csvHelper.loadCSV2DB(csvObj.tablePath,csvObj.tableObj,(result)=>{console.log(result.message)});
// });


let index = 0;
let csvObj = csvArr[index];
csvHelper.loadCSV2DB(csvObj.tablePath,csvObj.tableObj,(result)=>{
    console.log(result.message);
    index = index + 1;
    csvObj = csvArr[index];
    csvHelper.loadCSV2DB(csvObj.tablePath,csvObj.tableObj,(result)=>{
        console.log(result.message);
        index = index + 1;
        csvObj = csvArr[index];
        csvHelper.loadCSV2DB(csvObj.tablePath,csvObj.tableObj,(result)=>{
            console.log(result.message);
            index = index + 1;
            csvObj = csvArr[index];
            csvHelper.loadCSV2DB(csvObj.tablePath,csvObj.tableObj,(result)=>{
                console.log(result.message);
                index = index + 1;
                csvObj = csvArr[index];
                csvHelper.loadCSV2DB(csvObj.tablePath,csvObj.tableObj,(result)=>{
                    console.log(result.message);
                    index = index + 1;
                    csvObj = csvArr[index];
                    csvHelper.loadCSV2DB(csvObj.tablePath,csvObj.tableObj,(result)=>{
                        console.log(result.message);
                    });
                });
            });
        });
    });
});