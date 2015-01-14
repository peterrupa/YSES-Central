module.exports = function(app,eventEmitter,async){
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

	app.post('/login', function(req, res) {
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

	app.post('/logout', function(req, res) {
		var session = req.session;
		session.destroy();
		res.redirect('/');
	});

	app.post('/signup',
		[multer({dest:'./public/uploads/pending'}),
		function(req, res) {
			//insert validation here

			//set image names here
			var oldFileName = "public/uploads/pending/"+req.files["photo"]["name"];
			var newFileName = "public/uploads/pending/"+req.body["username"]+"."+req.files["photo"]["extension"];

			//clean up double instances of dropdowns
			req.body["org_class"] = req.body["org_class"][0];
			req.body["department"] = req.body["department"][0];
			req.body["org_batch"] = req.body["org_batch"][0];
			req.body["exec_position"]? req.body["exec_position"] = req.body["exec_position"][0] : req.body["exec_position"] = null;

			//if there's only one mentee, convert it to an array
			if(req.body["mentee"].constructor !== Array){
				req.body["mentee"] = [req.body["mentee"]];
			}

			async.parallel({
				image: function(callback){
					//rename uploaded file to account's username
					async.waterfall([
						function(callback){
							//rename photo
							try{
								fs.rename(oldFileName,newFileName);
								callback();
							}
							catch(err){
								callback(err);
							}
						},
						function(callback){
							//get image size
							try{
								gm(newFileName).size(function(err,size){
									callback(null,size);
								});
							}
							catch(err){
								callback(err);
							}
						},
						function(size,callback){
							//resize image to 250px
							try{
								if(size.width<size.height){
									gm(newFileName).resize(250).write(newFileName,function(err){
										callback(null,"top");
									});
								}
								else{
									gm(newFileName).resize(null,250).write(newFileName,function(err){
										callback(null,"left");
									});
								}
							}
							catch(err){
								callback(err);
							}
						},
						function(orientation,callback){
							//crop image
							try{
								if(orientation == "top"){
									gm(newFileName).crop(250,250,0,Math.abs(req.body["imageCoordinates"]["top"])).write(newFileName,function(err){
										callback();
									});
								}
								else{
									gm(newFileName).crop(250,250,Math.abs(req.body["imageCoordinates"]["left"]),0).write(newFileName,function(err){
										callback();
									});
								}
							}
							catch(err){
								callback(err);
							}
						}
					],
					function(err){
						if(err){
							console.log(err)
						}
						else{
							callback();
						}
					});
				},
				database: function(callback){
					//save info to the database
					pool.getConnection(function(err,connection){
						async.waterfall([
							function(callback){
								//check for already existing mentor
								var query = "SELECT username FROM `accounts` WHERE full_name="+connection.escape(req.body["mentor"]);
								connection.query(query,function(err,username){
									if(username[0]){
										req.body["mentor"] = username[0]["username"];
									}
									callback(null,req.body["mentor"]);
								});
							},
							function(mentor,callback){
								async.parallel({
									account: function(callback){
										//get full name
										var full_name = req.body["first_name"]+" "+req.body["middle_name"]+" "+req.body["last_name"];

										//salt and hash password
										var salt = "this is a rainbow unicorn";
										var password = encrypt(salt+req.body["password"]);

										var temp = {};

										//get student number
										temp["student_number"] = req.body["sn-year"]+"-"+req.body["sn-number"];

										//escape all input

										for(data in req.body){
											temp[data] = connection.escape(req.body[data]);
										}
										full_name = connection.escape(full_name);
										password = connection.escape(password);
										temp["student_number"] = connection.escape(temp["student_number"]);

										//insert to table
										var values = "("+temp["username"]+","+password+","+temp["first_name"]+","+temp["middle_name"]+","+temp["last_name"]+","+temp["org_class"]+","+temp["department"]+","+temp["student_number"]+","+temp["org_batch"]+","+temp["sn-year"]+","+temp["mentor"]+","+temp["birthday"]+","+temp["home_address"]+","+temp["college_address"]+",'"+newFileName+"',"+full_name+","+temp["exec_position"]+")";
										var query = "INSERT INTO `accounts_pending`(`username`, `password`, `first_name`, `middle_name`, `last_name`, `org_class`, `department`, `student_number`, `org_batch`, `univ_batch`, `mentor`, `birthday`, `home_address`, `college_address`, `picture`, `full_name`, `exec_position`) VALUES "+values;

										connection.query(query,function(err){
											if(err) throw err;
											callback();
										});
									},
									mentee: function(callback){
										//insert mentees
										if(req.body["mentee"]){
											async.map(req.body["mentee"],
											function(mentee,callback){
												//check if mentee has already existing account
												var query = "SELECT username FROM `accounts` WHERE full_name="+connection.escape(mentee);

												connection.query(query,function(err,username){
													if(username[0]){
														mentee = username[0]["username"];
													}
													callback(err,mentee);
												});
											},
											function(err,mentees){
												//insert username as pair
												var temp = [];
												for(var i = 0; i < mentees.length; i++){
													temp.push([mentees[i],req.body["username"]]);
												}
												//insert to database
												var query = "INSERT INTO `accounts_pending_mentee` (`mentee`,`mentor`) VALUES ?";
												connection.query(query,[temp],function(err){
													if(err) throw err;
													callback();
												});
											});
										}
										else{
											callback();
										}
									}
								},
								function(err){
									callback();
								});
							}
						],
						function(err){
							callback();
						});
					});
				}
			},
			function(err,results){
				if(err) res.sendStatus(500);
				else{
					res.sendStatus(200);
					console.log("New pending account "+req.body["username"]+" successfully processed.");

					//add picture
					req.body["picture"] = newFileName.substring(7);
					eventEmitter.emit('newaccount',req.body);
				}
			})
		}
	]);
}
