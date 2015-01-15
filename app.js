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

//application dependencies
var search = require('./routes/search')(app);
var functions = require('./routes/functions')(app,eventEmitter,async);
var indexhomepage = require('./routes/index-homepage')(app);
var profile = require('./routes/profile')(app,async);
var public = require('./routes/public')(app,request);
var viewAllYSERs = require('./routes/viewAllYSERs')(app);
var announcements = require('./routes/announcements')(app);
var logbook = require('./routes/logbook')(app,eventEmitter,async);
var batch = require('./routes/batch')(app);
//exec
var accountvalidator = require('./routes/exec/accountvalidator')(app,async);
var announcementposter = require('./routes/exec/announcementposter')(app,eventEmitter,async);

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
