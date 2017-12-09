const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const userSignUp = require('./workers/userSignUp');
const searchHomes = require('./controllers/searchHomes');
const getHomeInfo = require('./controllers/getHomeInfo');
const findHome = require('./controllers/findHome');
const login = require('./controllers/login')
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/frontend'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(__dirname + '/views/frontend'));
app.use('/userSignUp', userSignUp);
app.use('/searchHomes',searchHomes);
app.use('/getHomeInfo',getHomeInfo);
app.use('/findHome',findHome);
app.use('/login',login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
