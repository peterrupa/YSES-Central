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
				connection.query("SELECT first_name, middle_name, last_name, org_class, department, student_number, org_batch, univ_batch, DATE_FORMAT(`birthday`,'%M %e %Y') AS birthday, home_address, college_address, exec_position FROM `accounts` WHERE username="+connection.escape(req.query.account),function(err,data){
					if(err){
						reportError(res,err);
					}
					else{
						res.send(data[0]);
					}
				});
				connection.release();
			});
		}
		else{
			res.redirect("/");
		}
	});

/* OPTIMIZE */

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
			});
		}
	});

/* OPTIMIZE */

	//fetch mentees data
	// app.get('/getmentees', function(req,res){
	// 	var session = req.session;
	// 	if(session.userkey){
	// 		pool.getConnection(function(err,connection){
	// 			connection.query("SELECT username FROM `accounts` WHERE username="+connection.escape(req.query.account),function(err,username){
	// 				if(err){
	// 					reportError(res,err);
	// 				}
	// 				else{
	// 					connection.query("SELECT mentees FROM `accounts_"+username[0]["username"]+"_mentees` WHERE 1",function(err,mentees){
	// 						if(err){
	// 							reportError(res,err);
	// 						}
	// 						else{
	// 							if(mentees[0]){
	// 								//this list will serve as a list of those mentees w/o yses accounts
	// 								var menteesList = [];
	//
	// 								for(i = 0; i < mentees.length; i++){
	// 									menteesList.push(mentees[i]["mentees"]);
	// 								}
	// 								var subquery = "'" + mentees[0]["mentees"] + "'";
	//
	// 								for(var i = 1; i < mentees.length; i++){
	// 									subquery = subquery.concat(" || username='"+mentees[i]["mentees"]+"'");
	// 								}
	// 								connection.query("SELECT username, first_name, middle_name, last_name, picture, department, org_class FROM `accounts` WHERE username="+subquery,function(err,rows){
	// 									if(err){
	// 										console.log(err);
	// 										res.send("Internal server error");
	// 									}
	// 									else{
	// 										//remove /public and remove from mentee list
	// 										for(var j = 0; j < rows.length; j++){
	// 											if(menteesList.indexOf(rows[j]["username"]) != -1){
	// 												menteesList.splice(menteesList.indexOf(rows[j]["username"]),1);
	// 											}
	// 											rows[j]["picture"] = rows[j]["picture"].substring(7);
	// 										}
	//
	// 										//merge with accounts and without accounts into one object
	// 										var send = {accounts:rows,noaccounts:menteesList};
	//
	// 										res.send(send);
	// 									}
	// 								});
	// 							}
	// 							else{
	// 								res.send("0");
	// 							}
	// 						}
	// 					});
	// 				}
	// 			});
	// 			connection.release();
	// 		});
	// 	}
	// 	else{
	// 		res.redirect("/");
	// 	}
	// });
}
