module.exports = function(app,pool,async){
	function reportError(res,err){
		console.log(err);
		if(!res.headersSent){
			res.sendStatus(500);
		}
	}

  app.get('/spadscores/content',function(req,res){
    var session = req.session;

    if(session.userkey){
      pool.getConnection(function(err,connection){
				//be sure user is an JPAD member before doing stuffs!
				var query = "SELECT department FROM `accounts` WHERE username="+connection.escape(session.userkey);

				connection.query(query,function(err,department){
					if(err) reportError(res,err);
					else{
						if(department[0]["department"] != "Senior Projects and Activities"){
							res.sendStatus(403);
						}
						else{
							async.parallel({
								tasks: function(callback){
									//fetch list of tasks
									var query = "SELECT `task` AS name, DATE_FORMAT(`date`,'%c/%e/%Y') AS date, `maxscore` FROM `pad_jpadsters_task` WHERE 1 ORDER BY date";

									connection.query(query,function(err,tasks){
										if(err) callback(err);
										else{
											//pass this list to callback function
											callback(null,tasks);
										}
									});
								},
								jpadsters: function(callback){
									//fetch list of jpadsters
									var query = "SELECT `username`, `first_name` AS name, `picture` FROM `accounts` WHERE org_class='Active' AND department='Junior Projects and Activities' ORDER BY `first_name`";

									connection.query(query,function(err,jpadsters){
										if(err) callback(err);
										else{
											//pass this list to callback function
											callback(null,jpadsters);
										}
									});
								}
							},
							function(err,results){
								//iterate each jpadster, this builds the list of each jpadster
								async.each(results["jpadsters"],
								function(jpadster,callback){
									//declare a scores array
									jpadster["scores"] = [];

									//iterate each tasks, this builds the list of the jpadster's tasks with scores
									async.each(results["tasks"],
									function(task,callback){
										//find the score
										var query = "SELECT `score` FROM `pad_jpadsters_scores` WHERE username="+connection.escape(jpadster["username"])+" AND task="+connection.escape(task["name"]);

										connection.query(query,function(err,score){
											if(err) callback(err);
											else{
												var push = {
													task: task["name"],
													score: score[0]["score"],
												}

												//send this score to the score array
												jpadster["scores"].push(push);
												callback();
											}
										});
									},
									function(err){
										if(err) callback(err);
										else{
											//remove username property
											delete jpadster["username"];

											//remove /public in picture
											jpadster["picture"] = jpadster["picture"].substring(7);

											callback();
										}
									});
								},
								function(err){
									if(err) reportError(res,err);
									else{
										//render page with info to client
										console.log({tasks:results["tasks"],scores:results["jpadsters"]});
										res.render('spadscores',{tasks:results["tasks"],scores:results["jpadsters"]});
									}
								});
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
