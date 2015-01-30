module.exports = function(app,pool,async){
	function reportError(res,err){
		console.log(err);
		if(!res.headersSent){
			res.sendStatus(500);
		}
	}

  app.get('/schochecklist/content',function(req,res){
    var session = req.session;

    if(session.userkey){
      pool.getConnection(function(err,connection){
				//be sure user is an sec member before doing stuffs!
				var query = "SELECT department FROM `accounts` WHERE username="+connection.escape(session.userkey);

				connection.query(query,function(err,department){
					if(err) reportError(res,err);
					else{
						if(department[0]["department"] != "Scholastics"){
							res.sendStatus(403);
						}
						else{
							//will fetch sems and members
							async.parallel({
								sems: function(callback){
									//fetch list of sems
									var query = "SELECT `sem` FROM `scho_sem_list` WHERE 1";

									connection.query(query,function(err,sem){
										if(err) callback(err);
										else{
											//convert array of objects to array of strings
											for(var i = 0; i < sem.length; i++){
												sem[i] = sem[i]["sem"];
											}

											callback(null, sem);
										}
									});
								},
								members: function(callback){
									//fetch list of active members
									async.waterfall([
										function(callback){
											//get list of batches with active members
											var query = "SELECT DISTINCT batch FROM `org_batch` INNER JOIN `accounts` ON org_batch.batch=accounts.org_batch WHERE accounts.org_class='Active'";

											connection.query(query,function(err,batches){
												if(err) callback(err);
												else{
													//convert array of objects to array of strings
													for(var i = 0; i < batches.length; i++){
														batches[i] = batches[i]["batch"];
													}

													callback(null,batches);
												}
											});
										},
										function(batches,callback){
											var temp = [];
											async.each(batches,
											function(batch,callback){
												//get active members batch
												var query = "SELECT `username`, `first_name`, `picture` FROM `accounts` WHERE org_class='Active' AND org_batch="+connection.escape(batch);

												connection.query(query,function(err,members){
													if(err) callback(err);
													else{
														var tempmembers = {
															batch: batch,
															members: []
														};

														for(var i = 0; i < members.length; i++){
															//remove /public
															members[i]["picture"] = members[i]["picture"].substring(7);
															tempmembers["members"].push(members[i]);
														}

														temp.push(tempmembers);

														callback();
													}
												});
											},
											function(err){
												callback(null,temp);
											});
										}
									],
									function(err,data){
										callback(null,data);
									});
								}
							},
							function(err,data){
								if(err) reportError(res,err);
								else{
									//iterate each batch
									async.each(data["members"],
									function(batch,callback){
										//iterate each member
										async.each(batch["members"],
										function(member,callback){
											//iterate each sems
											var sems = [];

											async.each(data["sems"],
											function(sem,callback){
												var query = "SELECT `subject`, `grade`, `units` FROM `scho_checklist` WHERE username="+connection.escape(member["username"])+" AND sem="+connection.escape(sem);

												connection.query(query,function(err,subjects){
													if(err) callback(err);
													else{
														var push = {
															sem: sem,
															subjects: subjects
														};

														sems.push(push);
														callback();
													}
												});
											},
											function(err){
												member["checklist"] = sems;
												callback();
											});
										},
										function(err){
											callback();
										});
									},
									function(err){
										if(err) reportError(res,err);
										else{
											//console.log(data);
											//console.log( JSON.stringify(data));
											res.render('schochecklist',data);
											//res.sendStatus(200);
										}
									});
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
