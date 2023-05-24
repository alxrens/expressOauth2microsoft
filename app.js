const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config

const router = require('./router');

const session = require('express-session');
const flash = require('connect-flash');
const msal = require('@azure/msal-node');
const msalConfig = require('./config/msalconfig');

const app = express();

app.locals.user ={};
app.locals.msalClient = new msal.ConfidentialClientApplication(msalConfig)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session(
  {
    secret : process.env.SECRET_VALUE,
    resave : false,
    saveUninitialized :false,
    unset : 'destroy',
  }
));
app.use(flash())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);


app.use((req, res, next) => {
  res.locals.error = req.flash('error_msg');
  
  let errs = req.flash('error');

  for(let i in errs){
    res.locals.error.push({message : 'error', debug: errs[i]});
  }

  if(req.session.userId){
    res.locals.user = app.locals.users[req.session.userId]
  }

  next();
})



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
