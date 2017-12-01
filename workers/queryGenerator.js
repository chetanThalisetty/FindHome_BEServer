const logger = require('../lib/logger');
const responseObj = require('../lib/response');

exports.getInsertStr = function (hdrArr, valArr, tableName, response) {
    let cols = "(";
    let vals = "VALUES (";

    if(hdrArr.length >0 && valArr.length > 0 && hdrArr.length == valArr.length){
        let i = 0;
        for(i = 0 ; i < hdrArr.length-1; i++){
            cols = cols + hdrArr[i]+", ";
            vals = vals + "'" + valArr[i]+ "', ";
        }

        //after last element comma shouldn't be there, so separate module
        if( hdrArr.length > 0){
            cols = cols + hdrArr[i];
            vals = vals + "'" + valArr[i] + "'";
        }
        cols = cols + ") ";
        vals = vals + ") ;";
        const queryStr = "INSERT INTO " + tableName + cols + " " + vals;
        logger.log('info', 'queryGenerator - built insert Query string ' + queryStr);
        response(new responseObj('success', queryStr));
    }else {
        response(new responseObj('error', "either header length or value length is zero or header and value length doesnot match"));
    }
};