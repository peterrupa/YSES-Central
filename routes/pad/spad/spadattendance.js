module.exports = function(app,pool,async,eventEmitter){
	function reportError(res,err){
		console.log(err);
		if(!res.headersSent){
			res.sendStatus(500);
		}
	}

  app.get('/spadattendance/content',function(req,res){
    var session = req.session;

    if(session.userkey){
      pool.getConnection(function(err,connection){
				//be sure user is an SPAD member before doing stuffs!
				var query = "SELECT department FROM `accounts` WHERE username="+connection.escape(session.userkey);

				connection.query(query,function(err,department){
					if(err) reportError(res,err);
					else{
						if(department[0]["department"] != "Senior Projects and Activities"){
							res.sendStatus(403);
						}
						else{
							async.parallel({
								events: function(callback){
									//fetch lists of events here
									var query = "SELECT `event` AS name, DATE_FORMAT(`date`,'%c/%e/%Y') AS date FROM `pad_jpadsters_event` WHERE 1 ORDER BY date";

									connection.query(query,function(err,event){
										if(err) callback(err);
										else{
											callback(null,event);
										}
									});
								},
								attendance: function(callback){
									async.waterfall([
										function(callback){
											//fetch lists of active jpads
											var query = "SELECT `username`, `first_name`, `picture` FROM `accounts` WHERE org_class='Active' AND department='Junior Projects and Activities' ORDER BY `first_name`";

											connection.query(query,function(err,jpads){
												if(err) callback(err);
												else{
													var temp = [];

													for(var i = 0; i < jpads.length; i++){
														var push = {
															username: jpads[i]["username"],
															name: jpads[i]["first_name"],
															picture: jpads[i]["picture"].substring(7),
															eventsAttended: []
														};
														temp.push(push);
													}

													callback(null,temp);
												}
											});
										},
										function(jpads,callback){
											//for each jpadster, check their events attended on db
											async.map(jpads,
											function(jpad,callback){
												var query = "SELECT `event` FROM `pad_jpadsters_attendance` WHERE username="+connection.escape(jpad["username"]);

												connection.query(query,function(err,eventresult){
													if(err) callback(err);
													else{
														//push these events to eventsAttended
														for(var i = 0; i < eventresult.length; i++){
															jpad["eventsAttended"].push(eventresult[i]["event"]);
														}

														//remove username
														delete jpad["username"];

														//callback completed object
														callback(null,jpad);
													}
												});
											},
											function(err,jpadlist){
												callback(null,jpadlist);
											});
										}
									],
									function(err,jpadlist){
										//send complete list to callback
										callback(null,jpadlist);
									});
								}
							},
							function(err,send){
								if(err) return err;
								else{
							    res.render('spadattendance',send);
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

	app.post('/spadattendance/updateattendance',function(req,res){
    var session = req.session;

    if(session.userkey){
      pool.getConnection(function(err,connection){
				//be sure user is an SPAD member before doing stuffs!
				var query = "SELECT department FROM `accounts` WHERE username="+connection.escape(session.userkey);

				connection.query(query,function(err,department){
					if(err) reportError(res,err);
					else{
						if(department[0]["department"] != "Senior Projects and Activities"){
							res.sendStatus(403);
						}
						else{
							//iterate each member
							async.each(req.body["data"],
							function(jpadster,callback){
								var present = [], absent = [];

								//separate attended events from not
								for(var i = 0; i < jpadster["events"].length; i++){
									if(jpadster["events"][i]["value"] == true){
										present.push(jpadster["events"][i]["name"]);
									}
									else{
										absent.push(jpadster["events"][i]["name"]);
									}
								}

								async.parallel([
									function(callback){
										//present
										async.each(present,function(event,callback){
											//insert to db
											var query = "INSERT IGNORE INTO `pad_jpadsters_attendance`(`username`, `event`) VALUES ((SELECT username FROM `accounts` WHERE first_name="+connection.escape(jpadster["name"])+"),"+connection.escape(event)+")";

											connection.query(query,function(err){
												if(err) callback(err);
												else{
													callback();
												}
											});
										},
										function(err){
											if(err) callback(err);
											else{
												callback();
											}
										});
									},
									function(callback){
										//absent
										async.each(absent,function(event,callback){
											//insert to db
											var query = "DELETE FROM `pad_jpadsters_attendance` WHERE username=(SELECT username FROM `accounts` WHERE first_name="+connection.escape(jpadster["name"])+") AND event="+connection.escape(event);

											connection.query(query,function(err){
												if(err) callback(err);
												else{
													callback();
												}
											});
										},
										function(err){
											if(err) callback(err);
											else{
												callback();
											}
										});
									}
								],
								function(err){
									callback();
								});
							},
							function(err){
								if(err) reportError(res,err);
								else{
									eventEmitter.emit('spadattendanceedit');
									res.sendStatus(200);
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

	app.post('/spadattendance/newevent',function(req,res){
    var session = req.session;

    if(session.userkey){
      pool.getConnection(function(err,connection){
				//be sure user is an SPAD member before doing stuffs!
				var query = "SELECT department FROM `accounts` WHERE username="+connection.escape(session.userkey);

				connection.query(query,function(err,department){
					if(err) reportError(res,err);
					else{
						if(department[0]["department"] != "Senior Projects and Activities"){
							res.sendStatus(403);
						}
						else{
							async.parallel([
								function(callback){
									//insert event to events table
									var query = "INSERT INTO `pad_jpadsters_event`(`event`, `date`) VALUES ("+connection.escape(req.body["name"])+","+connection.escape(req.body["date"])+")";

									connection.query(query,function(err){
										if(err) callback(err);
										else callback();
									});
								},
								function(callback){
									//iterate each attendees
									async.each(req.body["attendees"],
									function(attendee,callback){
										var query = "INSERT INTO `pad_jpadsters_attendance`(`username`, `event`) VALUES ((SELECT username FROM `accounts` WHERE first_name="+connection.escape(attendee)+"),"+connection.escape(req.body["name"])+")";

										connection.query(query,function(err){
											if(err) callback(err);
											else callback();
										});
									},
									function(err){
										if(err) callback(err);
										else callback();
									});
								}
							],
							function(err){
								if(err) reportError(req,err);
								else{
									eventEmitter.emit('spadattendanceedit');
									res.sendStatus(200);
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
}
