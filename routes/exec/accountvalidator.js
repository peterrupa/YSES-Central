module.exports = function(app,async){
	//file
	var fs = require('fs');

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

	app.get('/accountvalidator/content', function(req,res){
	  var session = req.session;

	  if(session.userkey){
	    //identify first if user is an exec member
	    pool.getConnection(function(err,connection){
				var username = connection.escape(session.userkey);
	      var query = "SELECT username from `accounts` WHERE username="+username+" && org_class='Active' && exec_position IS NOT NULL";

				connection.query(query,function(err,result){
					if(err){
						reportError(res,err);
					}
					else{
						if(result[0]){
							res.render('accountvalidator')
						}
						else{
							res.send('You are not allowed to view this.');
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

	app.get('/getPendingAccounts', function(req,res){
	  var session = req.session;

	  if(session.userkey){
	    pool.getConnection(function(err,connection){
				var query = "SELECT `username`, `first_name`, `middle_name`, `last_name`, `org_class`, `department`, `student_number`, `org_batch`, `univ_batch`, `mentor`, DATE_FORMAT(`birthday`,'%Y-%m-%d') AS birthday, `home_address`, `college_address`, `picture`, `exec_position` FROM `accounts_pending` WHERE 1";

				connection.query(query,function(err,pending){
					if(err)	reportError(res,err);
					else{
						if(pending.length > 0){
							async.each(pending,function(account,callback){
								//remove public/
								account["picture"] = account["picture"].substring(7);

								var mentees = [];
								//fetch mentees
								var query = "SELECT `mentee` FROM `accounts_pending_mentee` WHERE mentor="+connection.escape(account["username"]);
								connection.query(query,function(err,mentee){
									if(err) reportError(res,err);
									else{
										//check if mentees have account
										async.each(mentee,function(mentee,callback){
											var query = "SELECT `full_name` FROM `accounts` WHERE username='"+mentee["mentee"]+"'";
											connection.query(query,function(err,result){
												if(err) reportError(res,err);
												else{
													if(result[0]){
														mentee["mentee"] = result[0]["full_name"];
													}
													mentees.push(mentee["mentee"]);
													callback();
												}
											});
										},function(err){
											if(err) reportError(res,err);
											else{
												account["mentee"] = mentees;
												callback();
											}
										});
									}
								});
							},function(err){
								if(err)	reportError(res,err);
								else{
									res.send(pending);
								}
							});
						}
						else{
							res.sendStatus(404);
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

	app.post('/acceptAccount', function(req,res){
	  var session = req.session;

	  if(session.userkey){
			//parse
			req.body["mentee"] = JSON.parse(req.body["mentee"]);

			//add /public to picture
			req.body["picture"] = "public/"+req.body["picture"];
			console.log("req.body[\"mentee\"]: "+req.body["mentee"])

			//insert to database
			pool.getConnection(function(err,connection){
				//get hashed password
				var query = "SELECT password FROM `accounts_pending` WHERE username="+connection.escape(req.body["origusername"]);
				connection.query(query,function(err,password){
					if(err){
						reportError(res,err);
					}
					else{
						//convert mentor name
						var query = 'SELECT username FROM `accounts` WHERE full_name='+connection.escape(req.body["mentor"]);
						connection.query(query,function(err,mentor){
							if(err){
								reportError(res,err);
							}
							else{
								if(mentor[0]){
									req.body["mentor"] = mentor[0]["username"];
								}
								//remove /pending on picture
								var picture = req.body["picture"].replace("pending/","");
								fs.rename("./"+req.body["picture"],"./"+picture, function(err){
									if(err){
										console.log(err);
									}
								});

								//fix exec_position value
								var exec_position;
								req.body["exec_position"] == "null" ? exec_position = "NULL" : exec_position = connection.escape(req.body["exec_position"]);

								var queryAccount = "INSERT INTO `accounts`(`username`, `password`, `first_name`, `middle_name`, `last_name`, `org_class`, `department`, `student_number`, `org_batch`, `univ_batch`, `mentor`, `birthday`, `home_address`, `college_address`, `picture`, `full_name`, `exec_position`) VALUES ("+connection.escape(req.body["username"])+","+connection.escape(password[0]["password"])+","+connection.escape(req.body["first_name"])+","+connection.escape(req.body["middle_name"])+","+connection.escape(req.body["last_name"])+","+connection.escape(req.body["org_class"])+","+connection.escape(req.body["department"])+","+connection.escape(req.body["studentNumber"])+","+connection.escape(req.body["org_batch"])+","+connection.escape(req.body["univ_batch"])+","+connection.escape(req.body["mentor"])+","+connection.escape(req.body["bday"])+","+connection.escape(req.body["homeAdd"])+","+connection.escape(req.body["collegeAdd"])+","+connection.escape(picture)+","+connection.escape(req.body["first_name"]+" "+req.body["middle_name"]+" "+req.body["last_name"])+","+exec_position+")";
								var account_username_mentees = "accounts_"+req.body["username"]+"_mentees";

								//insert row into accounts
								connection.query(queryAccount,function(err){
									if(err){
										reportError(res,err);
									}
									else{
										var queryMenteesTable = "CREATE TABLE "+account_username_mentees+" (mentees VARCHAR(50))";

										//insert row into accounts_username_mentees
										connection.query(queryMenteesTable,function(err){
											if(err){
												reportError(res,err);
											}
											else{
												//insert mentees to the newly generated table
												if(req.body["mentee"]){

													function insertMentee(mentee,i){
														connection.query("SELECT username FROM `accounts` WHERE full_name="+connection.escape(mentee),function(err,username){
															if(username[0]){
																mentee = username[0]["username"];
															}
															var queryMenteesRow = "INSERT INTO `"+account_username_mentees+"` (`mentees`) VALUES ("+connection.escape(mentee)+")";

															connection.query(queryMenteesRow,function(err){
																if(err){
																	reportError(res,err);
																}
																else if(i == req.body["mentee"].length - 1){
																	console.log("Account "+req.body["username"]+" accepted.");
																	res.sendStatus(200);
																}
															});
														});
													}

													for(var i = 0 ; i < req.body["mentee"].length; i++){

														insertMentee(req.body["mentee"][i],i);
													}
												}
												else{
													console.log("Account "+req.body["username"]+" accepted.");
													res.sendStatus(200);
												}

												//delete table
												connection.query("DROP TABLE `accounts_pending_"+req.body["origusername"]+"_mentees`",function(err){
													if(err){
														reportError(res,err);
													}
												});

												//transfer this on account accept
												//update already existing full name of mentors to usernames
												connection.query("UPDATE `accounts` SET `mentor`="+connection.escape(req.body["username"])+" WHERE mentor="+connection.escape(req.body["first_name"]+" "+req.body["middle_name"]+" "+req.body["last_name"]),function(err){
													if(err){
														reportError(res,err);
													}
												});

												//update already existing full name of mentees to usernames
												connection.query("SELECT username FROM `accounts` WHERE 1",function(err,results){
													if(err){
														reportError(res,err);
													}
													else{
														for(var j = 0; j < results.length; j++){
															(function(username){
																connection.query("UPDATE `accounts_"+username+"_mentees` SET `mentees`="+connection.escape(req.body["username"])+" WHERE mentees="+connection.escape(req.body["first_name"]+" "+req.body["middle_name"]+" "+req.body["last_name"]),function(err){
																	if(err){
																		reportError(res,err);
																	}
																});
															})(results[j]["username"]);
														}
													}
												});
											}
										});
										//remove row in accounts_pending
										var query = "DELETE FROM `accounts_pending` WHERE username="+connection.escape(req.body["origusername"]);
										connection.query(query,function(err){
											if(err){
												reportError(res,err);
											}
											else{
												console.log(req.body["origusername"]+" deleted from accounts_pending.");
											}
										});
									}
								});
							//bracket below is for else on mentor query
							}
						});
					//bracket below is for else on password query
					}
				});
				//fucking callback hell
				connection.release();
			});
		}
		else{
			res.redirect('/');
		}
	});

	app.post('/rejectAccount',function(req,res){
		var session = req.session;

		if(session.userkey){
			pool.getConnection(function(err,connection){
				var functionsDone = 0; //when this var reaches 2, all async functions are done
				//remove from accounts_pending
				connection.query("DELETE FROM `accounts_pending` WHERE username="+connection.escape(req.body["origusername"]),function(err){
					if(err){
						reportError(res,err);
					}
					else{
						complete();
					}
				});

				//drop table pending mentees
				connection.query("DROP TABLE `accounts_pending_"+req.body["origusername"]+"_mentees`",function(err){
					if(err){
						reportError(res,err);
					}
					else{
						complete();
					}
				})

				//delete image file from server
				fs.unlink("./"+req.body["picture"],function(err){
					if(err){
						reportError(res,err);
					}
					else{
						complete();
					}
				});

				//when both async queries complete
				function complete(){
					functionsDone++;
					if(functionsDone == 3){
						res.sendStatus(200);
						console.log("Account "+req.body["origusername"]+" rejected.");
					}
				}

				connection.release();
			});
		}
		else{
			res.redirect('/');
		}
	});
}
