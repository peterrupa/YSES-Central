module.exports = function(app,async){
	//database
	var mysql = require('mysql');
	var pool = mysql.createPool({
		host : 'localhost',
		user : 'root',
		password : '',
		database: 'yses_central'
	});

	function reportError(res,err){
		console.log(err);
		if(!res.headersSent){
			res.sendStatus(500);
		}
	}

	app.get('/profile/:username/content',function(req,res){
		var session = req.session;

		if(session.userkey){
			pool.getConnection(function(err,connection){
				var query = "SELECT username, first_name, middle_name, last_name, department, picture, exec_position FROM `accounts` WHERE username="+connection.escape(req.params.username);

				connection.query(query,function(err,account){
					if(err) reportError(res,err);
					else{
						if(account[0]){
							//remove /public in picture
							account[0]["picture"] = account[0]["picture"].substring(7);
							res.render("profile-content",{rows:account[0]});
						}
						else{
							res.sendStatus(404);
						}
					}
				});
			});
		}
		else{
			res.redirect('/');
		}
	});

	//fetch profile data
	app.get('/getdetails', function(req,res){
		var session = req.session;
		if(session.userkey){
			pool.getConnection(function(err,connection){
				async.parallel({
					details: function(callback){
						connection.query("SELECT first_name, middle_name, last_name, org_class, department, student_number, org_batch, univ_batch, DATE_FORMAT(`birthday`,'%M %e %Y') AS birthday, home_address, college_address, exec_position FROM `accounts` WHERE username="+connection.escape(req.query.account),function(err,data){
							if(err) callback(err);
							else{
								callback(null,data[0]);
							}
						});
					},
					owner: function(callback){
						//check if exec, he/she should be able to edit any profiles
						var query = "SELECT exec_position FROM `accounts` WHERE username="+connection.escape(session.userkey)+" AND org_class='Active'";
						connection.query(query,function(err,position){
							if(err) callback(err);
							else{
								if(position[0]["exec_position"]){
									callback(null,"true");
								}
								else{
									callback(null,"false");
								}
							}
						});
					}
				},
				function(err,send){
					if(err) reportError(res,err);
					else{
						send["details"]["owner"] = send["owner"];
						res.send(send["details"]);
					}
				});
				connection.release();
			});
		}
		else{
			res.redirect("/");
		}
	});

	//low prio optimize below

	app.get('/getmentor', function(req,res){
		var session = req.session;
		if(session.userkey){
			pool.getConnection(function(err,connection){
				connection.query("SELECT username, first_name, full_name, org_class, department, org_batch, picture FROM `accounts` WHERE username=(SELECT mentor FROM `accounts` WHERE username="+connection.escape(req.query.account)+")",function(err,data){
					if(err){
						reportError(res,err);
					}
					else{
						if(data[0]){
							data[0]["picture"] = data[0]["picture"].substring(7);
							res.send(data[0]);
						}
						else{
							connection.query("SELECT mentor FROM `accounts` WHERE username="+connection.escape(req.query.account),function(err,mentor){
								if(err){
									reportError(res,err)
								}
								else{
									res.send({status:"None",full_name:mentor[0]["mentor"]});
								}
							});
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

	app.get('/getmentees',function(req,res){
		var session = req.session;
		if(session.userkey){
			pool.getConnection(function(err,connection){
				async.waterfall([
					function(callback){
						//get mentee list
						var query = "SELECT `mentee` FROM `accounts_mentee` WHERE mentor="+connection.escape(req.query.account);

						connection.query(query,function(err,mentee){
							if(err){
								reportError(res,err);
								callback(err);
							}
							else if(!mentee[0]){
								callback("0");
							}
							else{
								callback(null,mentee);
							}
						});
					},
					function(mentee,callback){
						//fetch mentee details
						var Accounts = []; //with info
						var noAccounts = []; //without accounts

						async.each(mentee,
						function(menteeCheck,callback){
							//check for mentee info in database
							var query = "SELECT username, first_name, middle_name, last_name, picture, department, org_class FROM `accounts` WHERE username="+connection.escape(menteeCheck["mentee"]);

							connection.query(query,function(err,data){
								if(err){
									reportError(res,err);
									callback(err);
								}
								else{
									if(data[0]){
										//remove /public
										data[0]["picture"] = data[0]["picture"].substring(7);
										//add to Accounts array
										Accounts.push(data[0]);
									}
									else{
										//add to noAccounts array
										noAccounts.push(menteeCheck["mentee"]);
									}
									callback();
								}
							});
						},
						function(err,list){
							if(err){
								reportError(res,err);
								callback(err);
							}
							else callback(null,{Accounts:Accounts,noAccounts:noAccounts});
						});
					}],
				function(err,list){
					if(err == "0"){
						res.sendStatus(242);
					}
					else if(err){
						reportError(res,err);
					}
					else{
						res.send(list);
					}
				})
				connection.release();
			});
		}
	});

	//edit profile
	app.post('/editprofile',function(req,res){
		var session = req.session;

		if(session.userkey){
			pool.getConnection(function(err,connection){
				//query the database for edit
				var query = "UPDATE `accounts` SET "+connection.escapeId(req.body["dataname"])+"="+connection.escape(req.body["newdata"])+" WHERE username="+connection.escape(req.body["account"]);

				connection.query(query,function(err){
					if(err) reportError(res,err);
					else res.sendStatus(200);
				});
				connection.release();
			});
		}
		else{
			res.redirect('/');
		}
	})
}
