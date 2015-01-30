module.exports = function(app,pool,async){
	function reportError(res,err){
		console.log(err);
		if(!res.headersSent){
			res.sendStatus(500);
		}
	}

	app.get('/nschochecklist/content',function(req,res){
		var session = req.session;

		if(session.userkey){
			pool.getConnection(function(err,connection){
				//check if user is an active member
				var query = "SELECT org_class FROM `accounts` WHERE username="+connection.escape(session.userkey);

				connection.query(query,function(err,org_class){
					if(err) reportError(res,err);
					else{
						if(org_class[0]["org_class"] != "Active"){
							res.sendStatus(403);
						}
						else{
							async.waterfall([
								function(callback){
									var query = "SELECT `sem` FROM `scho_sem_list` WHERE 1";

									connection.query(query,function(err,sem){
										if(err) callback(err);
										else{
											for(var i = 0; i < sem.length; i++){
												sem[i] = sem[i]["sem"];
											}

											callback(null,sem);
										}
									});
								},
								function(sems,callback){
									var send = [];

									//console.log(sems);

									async.each(sems,
									function(item,callback){
										//console.log(item);

										var query = "SELECT `sem`, `subject`, `grade`, `units` FROM `scho_checklist` WHERE username="+connection.escape(session.userkey)+" AND sem="+connection.escape(item);

										connection.query(query,function(err,subjects){
											if(err) callback(err);
											else{
												//console.log(subjects);

												var push = {
													sem: item,
													subjects: []
												};

												for(var i = 0; i < subjects.length; i++){
													var push2 = {
														name: subjects[i].subject,
														grade: subjects[i].grade,
														units: subjects[i].units
													};

													push.subjects.push(push2);
												}

												send.push(push);
												callback();
											}
										})
									},
									function(err){
										callback(null,send);
									});
								}
							],
							function(err,checklist){
								if(err){
									console.log(err);
									res.sendStatus(500);
								}
								else{
									console.log(checklist);
									res.render('nschochecklist',{checklist:checklist});
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



// {
//   sems: [
//     {
//       name: '1st Sem 2014-2015',
//       subjects: [
//         {
//           name: 'CMSC 2',
//           grade: 1.00,
//           units: 3.0
//         }
//       ]
//     }
//   ]
// }
