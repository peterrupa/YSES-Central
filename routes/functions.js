module.exports = function(app){
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

						var queryAccount = "INSERT INTO `accounts_pending`(`username`, `password`, `first_name`, `middle_name`, `last_name`, `org_class`, `department`, `student_number`, `org_batch`, `univ_batch`, `mentor`, `birthday`, `home_address`, `college_address`, `picture`, `full_name`, `exec_position`) VALUES ("+connection.escape(req.body["username"])+","+connection.escape(password)+","+connection.escape(req.body["first-name"])+","+connection.escape(req.body["middle-name"])+","+connection.escape(req.body["last-name"])+","+connection.escape(req.body["org-class"])+","+connection.escape(req.body["department"])+","+connection.escape(studentNumber)+","+connection.escape(req.body["org-batch"])+","+connection.escape(req.body["univ-batch"])+","+connection.escape(req.body["mentor"])+","+connection.escape(req.body["bday"])+","+connection.escape(req.body["homeAdd"])+","+connection.escape(req.body["collegeAdd"])+","+connection.escape(newFileName)+","+connection.escape(req.body["first-name"]+" "+req.body["middle-name"]+" "+req.body["last-name"])+","+connection.escape(req.body["exec_position"])+")";
						var account_username_mentees = "accounts_pending_"+req.body["username"]+"_mentees";

						//insert row into accounts
						connection.query(queryAccount,function(err){
							if(err){
								console.log(err);
								res.send("Internal server error");
							}
							else{
								var queryMenteesTable = "CREATE TABLE "+account_username_mentees+" (mentees VARCHAR(50))";

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
															console.log("New account "+req.body["username"]+" pending for approval.");
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
											console.log("New account "+req.body["username"]+" pending for approval.");
										}

										//transfer this on account accept
										//update already existing full name of mentors to usernames
										connection.query("UPDATE `accounts` SET `mentor`="+connection.escape(req.body["username"])+" WHERE mentor="+connection.escape(req.body["first-name"]+" "+req.body["middle-name"]+" "+req.body["last-name"]),function(err){
											if(err){
												console.log(err);
												res.send("Internal server error");
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
}
