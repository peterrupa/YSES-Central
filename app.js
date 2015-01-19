//server routing dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var request = require('request');

var sessionMiddleware = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
})

//create events
var events = require('events');
var eventEmitter = new events.EventEmitter();

var app = express();

//async
var async = require('async');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// favicon
app.use(favicon(__dirname + '/public/favico.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev')); //routes below this line are logged

// start server
var http = app.listen(8080, function(){
	console.log('YSES Central started on :8080.');
});

//sessions
app.use(cookieParser());
app.use(sessionMiddleware)

var socket = require("./sockets/socket.js")(http,sessionMiddleware,eventEmitter);

//database
var mysql = require('mysql');
var pool = mysql.createPool({
  host : 'localhost',
  user : 'root',
  password : '',
  database: 'yses_central'
});

//application dependencies
require('./routes/search')(app,pool);
require('./routes/functions')(app,pool,eventEmitter,async);
require('./routes/index-homepage')(app);
require('./routes/profile')(app,pool,async);
require('./routes/public')(app,pool,request);
require('./routes/viewAllYSERs')(app,pool,async);
require('./routes/announcements')(app,pool);
require('./routes/logbook')(app,pool,eventEmitter,async);
require('./routes/batch')(app,pool);
//exec
require('./routes/exec/accountvalidator')(app,pool,eventEmitter,async);
require('./routes/exec/announcementposter')(app,pool,eventEmitter,async);
//pad
require('./routes/pad/padattendanceportal')(app,pool);
require('./routes/pad/padscoresportal')(app,pool);
require('./routes/pad/spad/spadattendance')(app,pool,async);
require('./routes/pad/jpad/jpadattendance')(app,pool,async);
require('./routes/pad/spad/spadscores')(app,pool,async);
require('./routes/pad/jpad/jpadscores')(app,pool,async);
//sec
require('./routes/sec/attendanceportal')(app,pool);
require('./routes/sec/secattendance')(app,pool,async);
require('./routes/sec/nsecattendance')(app,pool,async);
//scho
require('./routes/scho/checklistportal')(app,pool);
require('./routes/scho/schochecklist')(app,pool,async);
require('./routes/scho/nschochecklist')(app,pool,async);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
