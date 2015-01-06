//server routing dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

//application dependencies
var datafetch = require('./routes/datafetch');
var functions = require('./routes/functions');
var indexhomepage = require('./routes/index-homepage');
var profile = require('./routes/profile');
var public = require('./routes/public');
var viewAllYSERs = require('./routes/viewAllYSERs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// favicon
app.use(favicon(__dirname + '/public/favico.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//sessions
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(express.static(path.join(__dirname, 'public')));

app.use(datafetch);
app.use(functions);
app.use(indexhomepage);
app.use(profile);
app.use(public);
app.use(viewAllYSERs);

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

// start server
app.listen(8080, function(){
	console.log('YSES Central started on :8080.');
});

module.exports = app;
