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

router.get('/YSERs/content', function(req,res){
	var session = req.session;

	if(session.userkey){
		pool.getConnection(function(err,connection){
			connection.query("SELECT first_name, picture, exec_position FROM `accounts` WHERE username="+connection.escape(session.userkey),function(err,rows){
				if(err){
					console.log(err);
				}
				else{
					res.render('YSERs-content',{name: rows[0]["first_name"],picture: rows[0]["picture"].substring(7),exec_position: rows[0]["exec_position"]});
				}
			});
			connection.release();
		});
	}
	else{
		res.redirect('/');
	}
});

module.exports = router;
