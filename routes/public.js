var express = require('express');
var router = express.Router();

//database
var mysql = require('mysql');
var pool = mysql.createPool({
	host : 'localhost',
	user : 'root',
	password : '',
	database: 'yses_central'
});

function serveMain(req,res){
	var session = req.session;

	pool.getConnection(function(err,connection){
		connection.query("SELECT username, first_name, picture FROM `accounts` WHERE username="+connection.escape(session.userkey),function(err,rows){
			if(err) console.log(err);
			else{
				res.render('main',{username: rows[0]["username"],name: rows[0]["first_name"],picture: rows[0]["picture"].substring(7),});
			}
		});
		connection.release();
	});
}

//homepage
router.get('/', function(req, res) {
	var session = req.session;

	if(session.userkey){
		serveMain(req,res);
	}
	else{
		res.render('index');
	}
});

//profiles
router.get('/profile/:username',function(req,res){
	var session = req.session;
	if(session.userkey){
		serveMain(req,res);
	}
	else{
		res.redirect('/');
	}
});

//view all YSERs
router.get('/YSERs', function(req,res){
	serveMain(req,res);
});

/* TEST */
router.get('/test', function(req, res) {
	var session = req.session;
	if(session.userkey){
		pool.getConnection(function(err,connection){
			connection.query("SELECT first_name, picture, exec_position FROM `accounts` WHERE username="+connection.escape(session.userkey),function(err,rows){
				if(err) console.log(err);
				else{
					res.render('test',{name: rows[0]["first_name"],picture: rows[0]["picture"].substring(7),exec_position: rows[0]["exec_position"]});
				}
			});
			connection.release();
		});
	}
	else{
		res.render('index');
	}
});

router.get('/3/content', function(req, res) {
	var session = req.session;
	if(session.userkey){
		res.render('3');
	}
	else{
		//edit this
		res.redirect("/");
	}
});

module.exports = router;
