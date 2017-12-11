const localStrategy   = require('passport-local').Strategy;
const user = require('../models/userinfo.js');
const hashGen = require('../lib/hash.js');
const logger = require('../lib/logger.js');
const tInfo = require('../config/table_info');


function setUpStrategy(passport){
    passport.serializeUser(function(user, done) {
        console.log('in SerializeUser..');
        // console.log(user);
        done(null, user[tInfo.USER.columnName.ID]);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        console.log('in DeSerializeUser..');
        user.fetchByCols(["*"], tInfo.USER.columnName.ID + "= '" + id + "'", function(err, user) {
            if(!err){
                // console.log(user[0]);
                done(err,user[0]);
            }else{
                console("Failed..");
            }
        });
    });

    passport.use('local',new localStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },function(req, email, password, cb){
        process.nextTick(function(){
            logger.log('info','About to check the authentication with '+email+" with password as "+password);
            console.log('About to check the authentication with '+email+"and password as "+password);
            user.fetchByCols(["*"], tInfo.USER.columnName.email + "='" + email + "'",function(err,rows){
                if(err || !rows){
                    cb(null, false);
                    return
                }
                if(rows.length == 0){
                    logger.log('info','email does not exist in database');
                    console.log('email does not exist in database');
                    cb(null,false);
                }else{
                    // console.log(rows);
                    // console.log(rows[0][tInfo.USER.columnName.password]);
                    if( hashGen.comparePassword(rows[0][tInfo.USER.columnName.password], password) ){
                        logger.log('info','Authentication successful');
                        cb(null,rows[0]);
                    }else{
                        logger.log('info','Passwords not matched');
                        console.log('Passwords not matched');
                        cb(null,false);
                    }
                }
            });
        });
    }));
}
module.exports = setUpStrategy;