var express = require('express');
var router = express.Router();

//database
var mysql = require('mysql');
var pool = mysql.createPool({
	host : 'localhost',
	user : 'root',
	password : '',
	database: 'yses_central'
});

//search
router.get('/search',function(req,res){
	pool.getConnection(function(err,connection){
		var query = "SELECT username, full_name AS 'value', picture from `accounts` WHERE 1 ORDER BY full_name";

		connection.query(query,function(err,rows){
			if(err){
				console.log(err);
				res.send("Internal server error");
			}
			else{
				for(var i = 0; i < rows.length; i++){
					rows[i]["picture"] = rows[i]["picture"].substring(7);
					rows[i]["url"] = "http://localhost:8080/profile/" + rows[i]["username"];
				}
				res.send(rows);
			}
		});
		connection.release()
	});
});

//fetch YSERs data

router.get('/getYSERs', function(req,res){
	var session = req.session;

	if(session.userkey){
		pool.getConnection(function(err,connection){
			var filterBatch, filterClass;

			//determine filters
			//batch
			req.query.filterBatch = req.query.filterBatch.split(';')
			for(var i = 0; i < req.query.filterBatch.length; i++){
				if(i == 0){
					filterBatch = "org_batch = "+connection.escape(req.query.filterBatch[i]);
				}
				else{
					filterBatch += "|| org_batch = "+connection.escape(req.query.filterBatch[i]);
				}
			}

			//class
			req.query.filterClass = req.query.filterClass.split(';')
			req.query.filterClass.sort();
			for(var i = 0; i < req.query.filterClass.length; i++){
				if(i == 0){
					filterClass = "org_class = "+connection.escape(req.query.filterClass[i]);
				}
				else{
					filterClass += "|| org_class = "+connection.escape(req.query.filterClass[i]);
				}
			}

			//determine sort
			var sort;

			if(req.query.sort == "ASC"){
				sort = "ORDER BY full_name";
			}
			else{
				sort = "ORDER BY full_name DESC";
			}

			connection.query("SELECT username, first_name, full_name, picture, org_class, org_batch FROM `accounts` WHERE ("+filterBatch+") AND "+filterClass+" "+sort,function(err,data){
				if(err){
					console.log(err);
					res.send("Internal Server Error");
				}
				else{
					//remove public from pictures
					for(var i = 0; i < data.length; i++){
						data[i]["picture"] = data[i]["picture"].substring(7);
					}

					//inefficient shit, please fix later
					var result = {};
					for(var i = 0; i < req.query.filterBatch.length; i++){
						//for each batch let's make a temporary array to store the members
						members = [];
						for(var j = 0; j < data.length; j++){
							if(data[j]["org_batch"] == req.query.filterBatch[i]){
								members.push(data[j]);
							}
						}
						result[req.query.filterBatch[i]] = members;
					}
					res.send(result);
				}
			});
			connection.release();
		})
	}
	else{
		res.redirect('/');
	}
});

//fetch profile data
router.get('/getdetails', function(req,res){
	var session = req.session;
	if(session.userkey){
		pool.getConnection(function(err,connection){
			connection.query("SELECT first_name, middle_name, last_name, org_class, department, student_number, org_batch, univ_batch, DATE_FORMAT(`birthday`,'%M %e %Y') AS birthday, home_address, college_address, exec_position FROM `accounts` WHERE username="+connection.escape(req.query.account),function(err,data){
				if(err){
					console.log(err);
					res.send("Internal server error");
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

router.get('/getmentor', function(req,res){
	var session = req.session;
	if(session.userkey){
		pool.getConnection(function(err,connection){
			connection.query("SELECT mentor FROM `accounts` WHERE username="+connection.escape(req.query.account),function(err,username){
				if(err){
					console.log(err);
					res.send("Internal server error");
				}
				else{
					connection.query("SELECT username, first_name, full_name, org_class, department, org_batch, picture FROM `accounts` WHERE username="+connection.escape(username[0]["mentor"]),function(err,data){
						if(err){
							console.log(err);
							res.send("Internal server error");
						}
						else{
							if(data[0]){
								data[0]["picture"] = data[0]["picture"].substring(7);
								res.send(data[0]);
							}
							else{
								res.send({status:"None",full_name:username[0]["mentor"]});
							}
						}
					});
				}
			});
			connection.release();
		});
	}
	else{
		res.redirect('/');
	}
});

//fetch mentees data
router.get('/getmentees', function(req,res){
	var session = req.session;
	if(session.userkey){
		pool.getConnection(function(err,connection){
			connection.query("SELECT username FROM `accounts` WHERE username="+connection.escape(req.query.account),function(err,username){
				if(err){
					console.log(err);
					res.send("Internal server error");
				}
				else{
					connection.query("SELECT mentees FROM `accounts_"+username[0]["username"]+"_mentees` WHERE 1",function(err,mentees){
						if(err){
							console.log(err);
							res.send("Internal server error");
						}
						else{
							if(mentees[0]){
								//this list will serve as a list of those mentees w/o yses accounts
								var menteesList = [];

								for(i = 0; i < mentees.length; i++){
									menteesList.push(mentees[i]["mentees"]);
								}
								var subquery = "'" + mentees[0]["mentees"] + "'";

								for(var i = 1; i < mentees.length; i++){
									subquery = subquery.concat(" || username='"+mentees[i]["mentees"]+"'");
								}
								connection.query("SELECT username, first_name, middle_name, last_name, picture, department, org_class FROM `accounts` WHERE username="+subquery,function(err,rows){
									if(err){
										console.log(err);
										res.send("Internal server error");
									}
									else{
										//remove /public and remove from mentee list
										for(var j = 0; j < rows.length; j++){
											if(menteesList.indexOf(rows[j]["username"]) != -1){
												menteesList.splice(menteesList.indexOf(rows[j]["username"]),1);
											}
											rows[j]["picture"] = rows[j]["picture"].substring(7);
										}

										//merge with accounts and without accounts into one object
										var send = {accounts:rows,noaccounts:menteesList};

										res.send(send);
									}
								});
							}
							else{
								res.send("0");
							}
						}
					});
				}
			});
			connection.release();
		});
	}
	else{
		res.redirect("/");
	}
});

module.exports = router;
