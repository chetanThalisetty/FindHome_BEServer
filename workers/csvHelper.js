'use strict';

const parse      = require('csv-parse');
const fs         = require('fs');
const async      = require('async');
const csvHeaders = require('csv-headers');
const logger = require('../lib/logger');
const dbCon = require('../utils/dbConnection');
const qGenerator = require('../workers/queryGenerator');
const responseConst = require('../utils/constants').response;
const responseObj = require('../lib/response');
const tInfo = require('../config/table_info');

// TODO
// should change all the below constants
// const tableObj = tableConfig.COUNTRY;
// const csvFName = csvConfig.countryTable;

exports.loadCSV2DB = function(csvFName, tableObj, response){

    new Promise((resolve, reject) => {
        csvHeaders({
            file      : csvFName ,
            delimiter : ','
        }, function(err, headers) {
            if (err) reject(err);
            else resolve({ headers });
        });
    })
        .then(context => {
            return new Promise((resolve, reject) => {
                console.log(context.headers);
                dbCon.connect((err) => {
                    if (err) {
                        console.error('error connecting: ' + err.stack);
                        reject(err);
                    } else {
                        console.log('Successfully connected to the db');
                        resolve(context);
                    }
                });
            })
        })
        .then(context => {
            return new Promise((resolve, reject) => {
                dbCon.query("DROP TABLE IF EXISTS " + tableObj.tableName, function(err, result){
                    if(err) {
                        logger.log('error', 'Error on Query ' + err.message);
                        reject(err);
                    }else {
                        logger.log('info', 'Success on executing the query for dropping the table');
                        resolve(context);
                    }
                })
            });
        })
        .then(context => {
            return new Promise((resolve, reject) => {
                dbCon.query(tableObj.tableCreationQuery, function(err, result){
                    if(err) {
                        logger.log('error', 'Error on Query ' +tableObj.tableCreationQuery +' '+ err.message);
                        reject(err);
                    }else {
                        logger.log('info', 'Success on executing the query ' + tableObj.tableCreationQuery);
                        resolve(context);
                    }
                })
            });
        })
        .then(context => {
            return new Promise((resolve, reject) => {
                const readStream = fs.createReadStream(csvFName);
                readStream.pipe(parse({
                    delimiter: ',',
                    columns: true,
                    relax_column_count: true
                }, (err, data) => {
                    if(err) {
                        logger.log('error', 'Error on parse ' + err.message);
                        reject(err);
                    }
                    let count =1;
                    async.eachSeries(data,(datum, next)=>{
                        // console.log(datum);
                        console.log(count);
                        count = count +1;
                        let dataArr = [];
                        try{
                            context.headers.forEach(hdrVal => {
                                let cellVal = datum[hdrVal].trim();
                                const hostCols = tInfo.HOST.columnName;
                                if(hdrVal == hostCols.ABOUT || hdrVal == hostCols.LOCATION || hdrVal == hostCols.NAME){
                                    cellVal = cellVal.replace(/'/g,"''");
                                    // console.log(cellVal);
                                }
                                dataArr.push(cellVal === '' ? null : cellVal);
                            });
                        }catch(e){
                            logger.log('error', 'Error on parse ' + e.message);
                        }

                        qGenerator.getInsertStr(context.headers,dataArr,tableObj.tableName, (result)=>{
                            if(result.status == responseConst.SUCCESS){
                                const insertQueryStr = result.message;
                                dbCon.query(insertQueryStr, function(err, result){
                                    if(err) {
                                        logger.log('error', 'Error on Query ' + err.message);
                                        if (('' + err.message).includes('ER_DUP_ENTRY')){ //checking for ER_DUP_ENTRY
                                            setTimeout(() => { next(); });
                                        }else{
                                            console.log(dataArr);
                                            next(err);
                                        }
                                    }else {
                                        logger.log('info', 'Success on executing the query ' + insertQueryStr);
                                        setTimeout(() => { next(); });
                                    }
                                    // setTimeout(() => { next(); });
                                });
                            }else {
                                logger.log('error', 'Error while generating the insert str ' + insertQueryStr + ' '+ result.message);
                                next();
                            }
                        });
                    }, err => {
                        if (err) reject(err);
                        else resolve(context);
                    });
                }));
            });
        })
        .then(context => {
            dbCon.end();
            response(new responseObj(responseConst.SUCCESS, 'Successfully loaded '+ tableObj.tableName +' to database'));
        })
        .catch(err => {
            response(new responseObj(responseConst.ERROR, err.message));
        });
};
