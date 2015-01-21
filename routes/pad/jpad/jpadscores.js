module.exports = function(app,pool,async){
	function reportError(res,err){
		console.log(err);
		if(!res.headersSent){
			res.sendStatus(500);
		}
	}

  app.get('/jpadscores/content',function(req,res){
    var session = req.session;

    if(session.userkey){
      pool.getConnection(function(err,connection){
				//be sure user is a JPAD member before doing stuffs!
				var query = "SELECT department FROM `accounts` WHERE username="+connection.escape(session.userkey);

				connection.query(query,function(err,department){
					if(err) reportError(res,err);
					else{
						if(department[0]["department"] != "Junior Projects and Activities"){
							res.sendStatus(403);
						}
						else{
							async.waterfall([
								function(callback){
									//fetch list of tasks
									var query = "SELECT `task`, DATE_FORMAT(`date`,'%c/%e/%Y') AS date, `maxscore` FROM pad_jpadsters_task WHERE 1 ORDER BY date DESC";

									connection.query(query,function(err,tasks){
										if(err) callback(err);
										else{
											callback(null,tasks);
										}
									});
								},
								function(tasks,callback){
									//fetch score for each tasks
									async.each(tasks,
									function(task,callback){
										//query the database for score
										var query = "SELECT `score` FROM pad_jpadsters_scores WHERE username="+connection.escape(session.userkey)+" AND task="+connection.escape(task["task"]);

										connection.query(query,function(err,score){
											if(err) callback(err);
											else{
												//add score property on task with the score data as value
												task["score"] = score[0]["score"];
												callback();
											}
										});
									},
									function(err){
										callback(null,tasks);
									});
								}
							],
							function(err,send){
								//render page with data!
								if(err) reportError(res,err);
								else{
									res.render('jpadscores',{scores:send});
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
