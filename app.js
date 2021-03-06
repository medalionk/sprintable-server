var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./config');
var ObjectID = require('mongodb').ObjectID
var mongoskin = require('mongoskin');

var services = require('./routes/services');
var jobs = require('./routes/jobs');
var wips = require('./routes/wips');
var customers = require('./routes/customers');
var printshops = require('./routes/printshops');

var db = mongoskin.db(config.db.remoteUrl);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    req.db = {};
    req.db.services = db.collection('services');
    req.db.jobs = db.collection('jobs');
    req.db.customers = db.collection('customers');
    req.db.printshops = db.collection('printshops');
    req.createHexID = ObjectID.createFromHexString;
    next();
})

app.use('/api/services', services);
app.use('/api/jobs', jobs);
app.use('/api/wips', wips);
app.use('/api/customers', customers);
app.use('/api/printshops', printshops);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
