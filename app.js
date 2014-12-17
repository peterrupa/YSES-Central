//server routing dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');

//for image processing
var fs = require('fs');
var im = require('gm');
var gm = im.subClass({imageMagic:true});

//application dependencies
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var http = require('http').Server(app);

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

//upload
app.use(multer({dest:'./public/uploads/',
	rename: function(fieldname, filename){
		return filename+Date.now();
	},
	onFileUploadStart:function (file){
		console.log(file.originalname + ' is starting ...')
	},
	onFileUploadComplete: function(file){
		console.log(file.fieldname + ' uploaded to  ' + file.path)
	}
}));

app.use('/', routes);
app.use('/users', users);

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
http.listen(8080, function(){
	console.log('YSES Central started on :8080.');
});

module.exports = app;
