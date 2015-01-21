module.exports = function(app,pool,eventEmitter,async){
	//file
	var fs = require('fs');

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

	app.post('/acceptAccount',function(req,res){
		var session = req.session;

		if(session.userkey){
			//add /public to picture
			req.body["picture"] = "public/"+req.body["picture"];

			pool.getConnection(function(err,connection){
				async.parallel([
					function(callback){
						//extract file extension
						var indexExt = req.body["picture"].lastIndexOf(".");

						var fileExt = req.body["picture"].substring(indexExt,req.body["picture"].length);

						fs.rename("./"+req.body["picture"],"./public/uploads/"+req.body["username"]+fileExt, function(err){
							if(err) callback(err);
							else{
								callback();
							}
						});
					},
					function(callback){
						//get hashed password
						var query = "SELECT password FROM `accounts_pending` WHERE username="+connection.escape(req.body["origusername"]);

						connection.query(query,function(err,password){
							if(err) callback(err);
							else{
								req.body["password"] = password[0]["password"];
								callback();
							}
						});
					},
					function(callback){
						//check for mentor name
						var query = 'SELECT username FROM `accounts` WHERE full_name='+connection.escape(req.body["mentor"]);

						connection.query(query,function(err,mentor){
							if(err) callback(err);
							else{
								if(mentor[0]){
									req.body["mentor"] = mentor[0]["username"];
								}
								callback();
							}
						});
					},
					function(callback){
						//check for mentees name
						async.map(req.body["mentee"],
						function(mentee,callback){
							var query = "SELECT `username` FROM `accounts` WHERE full_name="+connection.escape(mentee);

							connection.query(query,function(err,username){
								if(err) callback(err);
								else{
									if(username[0]){
										mentee = username[0]["username"];
									}
									callback(null,mentee);
								}
							});
						},
						function(err,newList){
							req.body["mentee"] = newList;
							callback();
						});
					}
				],
				function(err){
					async.parallel([
						function(callback){
							//remove pending
							req.body["picture"] = req.body["picture"].replace(/pending\//g,"");

							//insert to accounts
							var query = "INSERT INTO `accounts`(`username`, `password`, `first_name`, `middle_name`, `last_name`, `org_class`, `department`, `student_number`, `org_batch`, `univ_batch`, `mentor`, `birthday`, `home_address`, `college_address`, `picture`, `full_name`, `exec_position`) VALUES ("+connection.escape(req.body["username"])+","+connection.escape(req.body["password"])+","+connection.escape(req.body["first_name"])+","+connection.escape(req.body["middle_name"])+","+connection.escape(req.body["last_name"])+","+connection.escape(req.body["org_class"])+","+connection.escape(req.body["department"])+","+connection.escape(req.body["student_number"])+","+connection.escape(req.body["org_batch"])+","+connection.escape(req.body["univ_batch"])+","+connection.escape(req.body["mentor"])+","+connection.escape(req.body["birthday"])+","+connection.escape(req.body["home_address"])+","+connection.escape(req.body["college_address"])+","+connection.escape(req.body["picture"])+","+connection.escape(req.body["first_name"]+" "+req.body["middle_name"]+" "+req.body["last_name"])+","+connection.escape(req.body["exec_position"])+")";

							connection.query(query,function(err){
								if(err) callback(err);
								else{
									callback();
								}
							});
						},
						function(callback){
							//remove from accounts_pending
							var query = "DELETE FROM `accounts_pending` WHERE username="+connection.escape(req.body["origusername"]);

							connection.query(query,function(err){
								if(err) callback(err);
								else{
									callback();
								}
							});
						},
						function(callback){
							//insert to accounts_mentees
							var pair = [];

							for(var i = 0; i < req.body["mentee"].length; i++){
								pair.push([req.body["mentee"][i],req.body["username"]]);
							}

							var query = "INSERT INTO `accounts_mentee`(`mentee`, `mentor`) VALUES ?";

							connection.query(query,[pair],function(err){
								if(err) callback(err);
								else{
									callback();
								}
							});
						},
						function(callback){
							//remove from accounts_pending
							var query = "DELETE FROM `accounts_pending_mentee` WHERE mentor="+connection.escape(req.body["origusername"]);

							connection.query(query,function(err){
								if(err) callback(err);
								else{
									callback();
								}
							});
						},
						function(callback){
							//update already existing mentor full name to username
							var query = "UPDATE `accounts` SET `mentor`="+connection.escape(req.body["username"])+" WHERE mentor="+connection.escape(req.body["first_name"]+" "+req.body["middle_name"]+" "+req.body["last_name"]);

							connection.query(query,function(err){
								if(err) callback(err);
								else{
									callback();
								}
							});
						},
						function(callback){
							//update already existing mentee full name to username
							var query = "UPDATE `accounts_mentee` SET `mentee`=[value-1] WHERE mentee="+connection.escape(req.body["first_name"]+" "+req.body["middle_name"]+" "+req.body["last_name"]);

							connection.query(query,function(err){
								if(err) callback(err);
								else{
									callback();
								}
							});
						}
					],
					function(err){
						//trigger event new account
						eventEmitter.emit('updateaccountvalidator',req.body["origusername"],"accepted");

						res.sendStatus(200);
					});
				});
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

				//remove all mentees
				var query = "DELETE FROM `accounts_pending_mentee` WHERE mentor="+connection.escape(req.body["origusername"]);
				connection.query(query,function(err){
					if(err){
						reportError(res,err);
					}
					else{
						complete();
					}
				})

				//delete image file from server
				fs.unlink("./public/"+req.body["picture"],function(err){
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
						eventEmitter.emit('updateaccountvalidator',{origusername:req.body["origusername"],status:"rejected"});
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
