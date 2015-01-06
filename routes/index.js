var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');

//for image processing
var im = require('gm');
var gm = im.subClass({imageMagic:true});

//database
var mysql = require('mysql');
var pool = mysql.createPool({
	host : 'localhost',
	user : 'root',
	password : '',
	database: 'yses_central'
});

//encryption
var crypto = require('crypto');

function encrypt(text) {
    return crypto.createHash('sha256').update(text).digest("hex");
}

function serveMain(req,res){
	var session = req.session;

	pool.getConnection(function(err,connection){
		connection.query("SELECT username, first_name, picture, exec_position FROM `accounts` WHERE username="+connection.escape(session.userkey),function(err,rows){
			if(err) console.log(err);
			else{
				res.render('main',{username: rows[0]["username"],name: rows[0]["first_name"],picture: rows[0]["picture"].substring(7),exec_position: rows[0]["exec_position"]});
			}
		});
		connection.release();
	});
}

/* GET home page. */
router.get('/', function(req, res) {
	var session = req.session;

	if(session.userkey){
		serveMain(req,res);
	}
	else{
		res.render('index');
	}
});

//profiles
router.get('/profile/:username',function(req,res){
	var session = req.session;
	if(session.userkey){
		serveMain(req,res);
	}
	else{
		res.redirect('/');
	}
});

router.get('/profile/:username/content',function(req,res){
	var session = req.session;

	if(session.userkey){
		pool.getConnection(function(err,connection){
			connection.query("SELECT username FROM `accounts` WHERE username="+connection.escape(req.params.username),function(err,rows){
				if(err){
					console.log(err);
					res.send("Internal server error!");
				}
				else{
					if(rows[0]){
						connection.query("SELECT username, first_name, middle_name, last_name, department, picture, exec_position FROM `accounts` WHERE username="+connection.escape(req.params.username),function(err,rows){
							if(err){
								console.log(err);
								res.send("Internal server error!");
							}
							else{
								//remove /public
								rows[0]["picture"] = rows[0]["picture"].substring(7);

								connection.query("SELECT mentees FROM `accounts_"+rows[0]["username"]+"_mentees` WHERE 1",function(err,rowsMentees){
									if(err){
										console.log(err);
										res.send("Internal server error!");
									}
									else{
										//before render, get owner's profile first
										connection.query("SELECT first_name, picture, exec_position FROM `accounts` WHERE username="+connection.escape(session.userkey),function(err,rows3){
											if(err){
												console.log(err);
											}
											else{
												res.render("profile-content",{rows:rows[0],rows2:rowsMentees,name:rows3[0]["first_name"],picture:rows3[0]["picture"].substring(7),exec_position:rows3[0]["exec_position"]});
											}
										});
									}
								});
							}
						});
					}
					else{
						res.send("No profile found!");
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

router.post('/login', function(req, res) {
	pool.getConnection(function(err,connection){
		var salt = "this is a rainbow unicorn"
		var password = encrypt(salt+req.body["password"]);

		connection.query("SELECT username FROM `accounts` WHERE username="+connection.escape(req.body["username"])+"&&password="+connection.escape(password),function(err,rows){
			if(rows[0]){ //successful login
				var session = req.session;
				session.userkey = rows[0]["username"];
				res.redirect("/");
			}
			else{ //no result
				//insert ajax response here
				res.send("None!");
			}
		});
		connection.release();
	});
});

router.post('/logout', function(req, res) {
	var session = req.session;
	session.destroy();
	res.redirect('/');
});


router.post('/signup',
	[multer({dest:'./public/uploads/pending'}),
	function(req, res) {
		//rename uploaded file to account's username
		var oldFileName = "public/uploads/pending/"+req.files["photo"]["name"];
		var newFileName = "public/uploads/pending/"+req.body["username"]+"."+req.files["photo"]["extension"];

		//process the uploaded image
		fs.rename(oldFileName,newFileName, function(){
			//get image size
			gm(newFileName).size(function(err,size){
				if(!err){
					//resize image to 150px
					if(size.width<size.height){
						gm(newFileName).resize(250).write(newFileName,function(err){
							if(!err){
								gm(newFileName).crop(250,250,0,Math.abs(req.body["imagetop"])).write(newFileName,function(err){
									if(!err){
										console.log(newFileName+" resized to 150x150 px, cropped at (0,"+Math.abs(req.body["imagetop"])+").");
									}
								});
							}
						});
					}
					else{
						gm(newFileName).resize(null,250).write(newFileName,function(err){
							if(!err){
								gm(newFileName).crop(250,250,Math.abs(req.body["imageleft"]),0).write(newFileName,function(err){
									console.log(newFileName+" resized to 150x150 px, cropped at ("+Math.abs(req.body["imageleft"])+",0).");
								});
							}
						});
					}
				}
			});
		});

		//save to database
		pool.getConnection(function(err,connection){
			connection.query("SELECT username FROM `accounts` WHERE full_name="+connection.escape(req.body["mentor"]),function(err,username){
				if(err){
					console.log(err);
					res.send("Internal server error");
				}
				else{
					if(username[0]){
						req.body["mentor"] = username[0]["username"];
					}
					var studentNumber = req.body["sn-year"]+"-"+req.body["sn-number"];
					var salt = "this is a rainbow unicorn"
					var password = encrypt(salt+req.body["password"])

					var queryAccount = "INSERT INTO `accounts`(`username`, `password`, `first_name`, `middle_name`, `last_name`, `org_class`, `department`, `student_number`, `org_batch`, `univ_batch`, `mentor`, `birthday`, `home_address`, `college_address`, `picture`, `full_name`, `exec_position`) VALUES ("+connection.escape(req.body["username"])+","+connection.escape(password)+","+connection.escape(req.body["first-name"])+","+connection.escape(req.body["middle-name"])+","+connection.escape(req.body["last-name"])+","+connection.escape(req.body["org-class"])+","+connection.escape(req.body["department"])+","+connection.escape(studentNumber)+","+connection.escape(req.body["org-batch"])+","+connection.escape(req.body["univ-batch"])+","+connection.escape(req.body["mentor"])+","+connection.escape(req.body["bday"])+","+connection.escape(req.body["homeAdd"])+","+connection.escape(req.body["collegeAdd"])+","+connection.escape(newFileName)+","+connection.escape(req.body["first-name"]+" "+req.body["middle-name"]+" "+req.body["last-name"])+","+connection.escape(req.body["exec_position"])+")";
					var account_username_mentees = "accounts_"+req.body["username"]+"_mentees";

					//insert row into accounts
					connection.query(queryAccount,function(err){
						if(err){
							console.log(err);
							res.send("Internal server error");
						}
						else{
							var queryMenteesTable = "CREATE TABLE accounts_"+req.body["username"]+"_mentees (mentees VARCHAR(50))";

							//insert row into accounts_username_mentees
							connection.query(queryMenteesTable,function(err){
								if(err){
									console.log(err);
									res.send("Internal server error!");
								}
								else{
									//insert mentees to the newly generated table
									if(req.body["numberofmentees"] > 0){

										function insertMentee(mentee,i){
											connection.query("SELECT username FROM `accounts` WHERE full_name="+connection.escape(mentee),function(err,username){
												if(username[0]){
													mentee = username[0]["username"];
												}
												var queryMenteesRow = "INSERT INTO `"+account_username_mentees+"` (`mentees`) VALUES ("+connection.escape(mentee)+")";

												connection.query(queryMenteesRow,function(err){
													if(err){
														console.log(err);
														res.send("Internal server error!");
													}
													else if(i == parseInt(req.body["numberofmentees"]) - 1){
														console.log("New account "+req.body["username"]+" succesfully created.");
													}
												});
											});
										}

										for(var i = 0 ; i < req.body["numberofmentees"]; i++){
											var variableName = "mentee-"+(i+1);

											insertMentee(req.body[variableName],i);
										}
									}
									else{
										console.log("New account "+req.body["username"]+" succesfully created.");
									}
									//update already existing full name of mentors to usernames
									connection.query("UPDATE `accounts` SET `mentor`="+connection.escape(req.body["username"])+" WHERE mentor="+connection.escape(req.body["first-name"]+" "+req.body["middle-name"]+" "+req.body["last-name"]),function(err){
										if(err){
											console.log(err);
											res.send("Internal server error");
										}
									});

									//update already existing full name of mentees to usernames
									connection.query("SELECT username FROM `accounts` WHERE 1",function(err,results){
										if(err){
											console.log(err);
											res.send("Internal server error");
										}
										else{
											for(var j = 0; j < results.length; j++){
												(function(username){
													connection.query("UPDATE `accounts_"+username+"_mentees` SET `mentees`="+connection.escape(req.body["username"])+" WHERE mentees="+connection.escape(req.body["first-name"]+" "+req.body["middle-name"]+" "+req.body["last-name"]),function(err){
														if(err){
															console.log(err);
															res.send("Internal server error");
														}
													});
												})(results[j]["username"]);
											}
										}
									});
								}
							});
						}
					});
				}
			});
			connection.release();
		});

		res.redirect("/");
	}
]);

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

//view all YSERs
router.get('/YSERs', function(req,res){
	serveMain(req,res);
});

router.get('/YSERs/content', function(req,res){
	var session = req.session;

	if(session.userkey){
		pool.getConnection(function(err,connection){
			connection.query("SELECT first_name, picture, exec_position FROM `accounts` WHERE username="+connection.escape(session.userkey),function(err,rows){
				if(err){
					console.log(err);
				}
				else{
					res.render('YSERs-content',{name: rows[0]["first_name"],picture: rows[0]["picture"].substring(7),exec_position: rows[0]["exec_position"]});
				}
			});
			connection.release();
		});
	}
	else{
		res.redirect('/');
	}
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
										//remove /public
										for(var j = 0; j < rows.length; j++){
											rows[j]["picture"] = rows[j]["picture"].substring(7);
										}
										res.send(rows);
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

/* TEST */
router.get('/test', function(req, res) {
	var session = req.session;
	if(session.userkey){
		pool.getConnection(function(err,connection){
			connection.query("SELECT first_name, picture, exec_position FROM `accounts` WHERE username="+connection.escape(session.userkey),function(err,rows){
				if(err) console.log(err);
				else{
					res.render('test',{name: rows[0]["first_name"],picture: rows[0]["picture"].substring(7),exec_position: rows[0]["exec_position"]});
				}
			});
			connection.release();
		});
	}
	else{
		res.render('index');
	}
});
router.post('/upload',function(req,res){
	console.log(req.files);
	res.end("File uploaded.");
});

/* CONTENT */

router.get('/content', function(req, res) {
	var session = req.session;
	if(session.userkey){
		res.render('homepage-content');
	}
	else{
		res.redirect("/");
	}
});

router.get('/1/content', function(req, res) {
	var session = req.session;
	if(session.userkey){
		res.render('1');
	}
	else{
		//edit this
		res.redirect("/");
	}
});

router.get('/2/content', function(req, res) {
	var session = req.session;
	if(session.userkey){
		res.render('2');
	}
	else{
		//edit this
		res.redirect("/");
	}
});

router.get('/3/content', function(req, res) {
	var session = req.session;
	if(session.userkey){
		res.render('3');
	}
	else{
		//edit this
		res.redirect("/");
	}
});

module.exports = router;
