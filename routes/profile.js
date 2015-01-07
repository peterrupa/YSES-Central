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

router.get('/profile/:username/content',function(req,res){
	var session = req.session;

	if(session.userkey){
		pool.getConnection(function(err,connection){
			connection.query("SELECT username FROM `accounts` WHERE username="+connection.escape(req.params.username),function(err,rows){
				if(err){
					console.log(err);
					res.send("Internal server error!");
				}
				else{
					if(rows[0]){
						connection.query("SELECT username, first_name, middle_name, last_name, department, picture, exec_position FROM `accounts` WHERE username="+connection.escape(req.params.username),function(err,rows){
							if(err){
								console.log(err);
								res.send("Internal server error!");
							}
							else{
								//remove /public
								rows[0]["picture"] = rows[0]["picture"].substring(7);

								connection.query("SELECT mentees FROM `accounts_"+rows[0]["username"]+"_mentees` WHERE 1",function(err,rowsMentees){
									if(err){
										console.log(err);
										res.send("Internal server error!");
									}
									else{
										res.render("profile-content",{rows:rows[0],rows2:rowsMentees});
									}
								});
							}
						});
					}
					else{
						res.send("No profile found!");
					}
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
