module.exports = function(app,pool,async,eventEmitter){
	function reportError(res,err){
		console.log(err);
		if(!res.headersSent){
			res.sendStatus(500);
		}
	}

  app.get('/secattendance/content',function(req,res){
    var session = req.session;

    if(session.userkey){
      pool.getConnection(function(err,connection){
				//be sure user is an sec member before doing stuffs!
				var query = "SELECT department FROM `accounts` WHERE username="+connection.escape(session.userkey);

				connection.query(query,function(err,department){
					if(err) reportError(res,err);
					else{
						if(department[0]["department"] != "Secretariat"){
							res.sendStatus(403);
						}
						else{
							async.parallel({
			          events: function(callback){
			            //fetch lists of events here
			            var query = "SELECT `event` AS name, DATE_FORMAT(`date`,'%c/%e/%Y') AS date FROM `sec_ysers_event` WHERE 1 ORDER BY date";

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
			                //fetch lists of active ysers
			                var query = "SELECT `username`, `first_name`, `picture` FROM `accounts` WHERE org_class='Active' ORDER BY `first_name`";

			                connection.query(query,function(err,ysers){
			                  if(err) callback(err);
			                  else{
			                    var temp = [];

			                    for(var i = 0; i < ysers.length; i++){
			                      var push = {
			                        username: ysers[i]["username"],
			                        name: ysers[i]["first_name"],
			                        picture: ysers[i]["picture"].substring(7),
			                        eventsAttended: []
			                      };
			                      temp.push(push);
			                    }

			                    callback(null,temp);
			                  }
			                });
			              },
			              function(ysers,callback){
			                //for each yser, check their events attended on db
			                async.map(ysers,
			                function(yser,callback){
			                  var query = "SELECT `event` FROM `sec_ysers_attendance` WHERE username="+connection.escape(yser["username"]);

			                  connection.query(query,function(err,eventresult){
			                    if(err) callback(err);
			                    else{
			                      //push these events to eventsAttended
			                      for(var i = 0; i < eventresult.length; i++){
			                        yser["eventsAttended"].push(eventresult[i]["event"]);
			                      }

			                      //remove username
			                      delete yser["username"];

			                      //callback completed object
			                      callback(null,yser);
			                    }
			                  });
			                },
			                function(err,yserlist){
			                  callback(null,yserlist);
			                });
			              }
			            ],
			            function(err,yserlist){
			              //send complete list to callback
			              callback(null,yserlist);
			            });
			          }
			        },
			        function(err,send){
			          if(err) reportErr(res,err);
			          else{
			            res.render('secattendance',send);
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

	app.post('/secattendance/updateattendance',function(req,res){
    var session = req.session;

    if(session.userkey){
      pool.getConnection(function(err,connection){
				//be sure user is an sec member before doing stuffs!
				var query = "SELECT department FROM `accounts` WHERE username="+connection.escape(session.userkey);

				connection.query(query,function(err,department){
					if(err) reportError(res,err);
					else{
						if(department[0]["department"] != "Secretariat"){
							res.sendStatus(403);
						}
						else{
							//iterate each member
							async.each(req.body["data"],
							function(yser,callback){
								var present = [], absent = [];

								//separate attended events from not
								for(var i = 0; i < yser["events"].length; i++){
									if(yser["events"][i]["value"] == true){
										present.push(yser["events"][i]["name"]);
									}
									else{
										absent.push(yser["events"][i]["name"]);
									}
								}

								async.parallel([
									function(callback){
										//present
										async.each(present,function(event,callback){
											//insert to db
											var query = "INSERT IGNORE INTO `sec_ysers_attendance`(`username`, `event`) VALUES ((SELECT username FROM `accounts` WHERE first_name="+connection.escape(yser["name"])+"),"+connection.escape(event)+")";

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
											var query = "DELETE FROM `sec_ysers_attendance` WHERE username=(SELECT username FROM `accounts` WHERE first_name="+connection.escape(yser["name"])+") AND event="+connection.escape(event);

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
									eventEmitter.emit('secattendanceedit');
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

	app.post('/secattendance/newevent',function(req,res){
    var session = req.session;

    if(session.userkey){
      pool.getConnection(function(err,connection){
				//be sure user is an sec member before doing stuffs!
				var query = "SELECT department FROM `accounts` WHERE username="+connection.escape(session.userkey);

				connection.query(query,function(err,department){
					if(err) reportError(res,err);
					else{
						if(department[0]["department"] != "Secretariat"){
							res.sendStatus(403);
						}
						else{
							async.parallel([
								function(callback){
									//insert event to events table
									var query = "INSERT INTO `sec_ysers_event`(`event`, `date`) VALUES ("+connection.escape(req.body["name"])+","+connection.escape(req.body["date"])+")";

									connection.query(query,function(err){
										if(err) callback(err);
										else callback();
									});
								},
								function(callback){
									//iterate each attendees
									async.each(req.body["attendees"],
									function(attendee,callback){
										var query = "INSERT INTO `sec_ysers_attendance`(`username`, `event`) VALUES ((SELECT username FROM `accounts` WHERE first_name="+connection.escape(attendee)+"),"+connection.escape(req.body["name"])+")";

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
									eventEmitter.emit('secattendanceedit');
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

	app.post('/secattendance/removeevent',function(req,res){
    var session = req.session;

    if(session.userkey){
      pool.getConnection(function(err,connection){
				//be sure user is an sec member before doing stuffs!
				var query = "SELECT department FROM `accounts` WHERE username="+connection.escape(session.userkey);

				connection.query(query,function(err,department){
					if(err) reportError(res,err);
					else{
						if(department[0]["department"] != "Secretariat"){
							res.sendStatus(403);
						}
						else{
							async.parallel([
								function(callback){
									//remove from events table
									var query = "DELETE FROM `sec_ysers_event` WHERE event="+connection.escape(req.body["name"]);

									connection.query(query,function(err){
										if(err) callback(err);
										else callback();
									});
								},
								function(callback){
									var query = "DELETE FROM `sec_ysers_attendance` WHERE event="+connection.escape(req.body["name"]);

									connection.query(query,function(err){
										if(err) callback(err);
										else callback();
									});
								}
							],
							function(err){
								if(err) reportError(res,err);
								else{
									eventEmitter.emit('secattendanceedit');
									res.sendStatus(200)
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
