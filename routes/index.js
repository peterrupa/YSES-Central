var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');

//for image processing
var im = require('gm');
var gm = im.subClass({imageMagic:true});

//database
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res) {
	var session = req.session;
	if(session.userkey){
		var connection = mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : '',
			database: 'yses_central'
		});

		connection.connect();
		connection.query("SELECT first_name, picture FROM `accounts` WHERE username="+connection.escape(session.userkey),function(err,rows){
			if(err) console.log(err);
			else{
				res.render('homepage',{name: rows[0]["first_name"],picture: rows[0]["picture"].substring(7)});
			}
		});
	}
	else{
		res.render('index');
	}
});

//profiles
router.get('/profile/:name',function(req,res){
	var session = req.session;

	if(session.userkey){
		var connection = mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : '',
			database: 'yses_central'
		});

		connection.connect();
		connection.query("SELECT first_name FROM `accounts` WHERE first_name="+connection.escape(req.params.name),function(err,rows){
			if(err){
				console.log(err);
				res.send("Internal server error!");
			}
			else{
				if(rows[0]){
					connection.query("SELECT username, first_name, middle_name, last_name, org_class, department, student_number, org_batch, univ_batch, mentor, birthday, home_address, college_address, picture FROM `accounts` WHERE first_name="+connection.escape(req.params.name),function(err,rows){
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
									connection.end();
								}
								else{
									//before render, get owner's profile first
									connection.query("SELECT first_name, picture FROM `accounts` WHERE username="+connection.escape(session.userkey),function(err,rows3){
										if(err){
											console.log(err);
											connection.end();
										}
										else{
											res.render("profile",{rows:rows[0],rows2:rowsMentees,name:rows3[0]["first_name"],picture:rows3[0]["picture"].substring(7)});
											connection.end();
										}
									});
								}
							});
						}
					});
				}
				else{
					res.send("No profile found!");
					connection.end();
				}
			}
		});
	}
	else{
		res.redirect('/');
	}
});

router.get('/profile/:name/content',function(req,res){
	var session = req.session;

	if(session.userkey){
		var connection = mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : '',
			database: 'yses_central'
		});

		connection.connect();
		connection.query("SELECT first_name FROM `accounts` WHERE first_name="+connection.escape(req.params.name),function(err,rows){
			if(err){
				console.log(err);
				res.send("Internal server error!");
			}
			else{
				if(rows[0]){
					connection.query("SELECT username, first_name, middle_name, last_name, org_class, department, student_number, org_batch, univ_batch, mentor, birthday, home_address, college_address, picture FROM `accounts` WHERE first_name="+connection.escape(req.params.name),function(err,rows){
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
									connection.end();
								}
								else{
									res.render("profile-content",{rows:rows[0],rows2:rowsMentees});
									connection.end();
								}
							});
						}
					});
				}
				else{
					res.send("No profile found!");
					connection.end();
				}
			}
		});
	}
	else{
		res.redirect('/');
	}
});

router.post('/login', function(req, res) {
	var connection = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : '',
		database: 'yses_central'
	});
	console.log("Username: "+req.body["username"]);
	console.log("Password: "+req.body["password"]);
	connection.connect();
	connection.query("SELECT username FROM `accounts` WHERE username="+connection.escape(req.body["username"])+"&&password="+connection.escape(req.body["password"]),function(err,rows){
		if(rows[0]){ //successful login
			var session = req.session;
			session.userkey = rows[0]["username"];
			res.redirect("/");
			connection.end();
		}
		else{ //no result
			//insert ajax response here
			res.send("None!");
			connection.end();
		}
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
						gm(newFileName).resize(150).write(newFileName,function(err){
							if(!err){
								gm(newFileName).crop(150,150,0,Math.abs(req.body["imagetop"])).write(newFileName,function(err){
									if(!err){
										console.log(newFileName+" resized to 150x150 px, cropped at (0,"+Math.abs(req.body["imagetop"])+").");
									}
								});
							}
						});
					}
					else{
						gm(newFileName).resize(null,150).write(newFileName,function(err){
							if(!err){
								gm(newFileName).crop(150,150,Math.abs(req.body["imageleft"]),0).write(newFileName,function(err){
									console.log(newFileName+" resized to 150x150 px, cropped at ("+Math.abs(req.body["imageleft"])+",0).");
								});
							}
						});
					}
				}
			});
		});

		//save to database
		var connection = mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : '',
			database: 'yses_central'
		});

		var studentNumber = req.body["sn-year"]+"-"+req.body["sn-number"];

		var queryAccount = "INSERT INTO `accounts`(`username`, `password`, `first_name`, `middle_name`, `last_name`, `org_class`, `department`, `student_number`, `org_batch`, `univ_batch`, `mentor`, `birthday`, `home_address`, `college_address`, `is_exec`, `picture`) VALUES ("+connection.escape(req.body["username"])+","+connection.escape(req.body["password"])+","+connection.escape(req.body["first-name"])+","+connection.escape(req.body["middle-name"])+","+connection.escape(req.body["last-name"])+","+connection.escape(req.body["org-class"])+","+connection.escape(req.body["department"])+","+connection.escape(studentNumber)+","+connection.escape(req.body["org-batch"])+","+connection.escape(req.body["univ-batch"])+","+connection.escape(req.body["mentor"])+","+connection.escape(req.body["bday"])+","+connection.escape(req.body["homeAdd"])+","+connection.escape(req.body["collegeAdd"])+",0,"+connection.escape(newFileName)+")";

		var queryMenteesTable = "CREATE TABLE accounts_"+req.body["username"]+"_mentees (mentees VARCHAR(50))";
		var account_username_mentees = "accounts_"+req.body["username"]+"_mentees";

		connection.connect();
		//insert row into accounts
		connection.query(queryAccount,function(err){
			if(err){
				console.log(err);
				res.send("Internal server error");
			}
			else{
				//insert row into accounts_username_mentees
				connection.query(queryMenteesTable,function(err){
					if(err){
						console.log(err);
						res.send("Internal server error!");
					}
					else{
						if(req.body["numberofmentees"] > 0){
							for(var i = 0 ; i < req.body["numberofmentees"]; i++){
								var variableName = "mentee-"+(i+1);
								var queryMenteesRow = "INSERT INTO `"+account_username_mentees+"` (`mentees`) VALUES ("+connection.escape(req.body[variableName])+")";

								connection.query(queryMenteesRow,function(err){
									if(err){
										console.log(err);
										res.send("Internal server error!");
									}
								});
							}
							console.log("New account "+req.body["username"]+" succesfully created.");
							connection.end();
						}
						else{
							console.log("New account "+req.body["username"]+" succesfully created.");
							connection.end();
						}
					}
				});
			}
		});

		res.redirect("/");
	}
]);

//search
router.get('/search',function(req,res){
	var connection = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : '',
		database: 'yses_central'
	});
	var substring1 = connection.escape(req.query.substring+"%");
	var substring2 = connection.escape("% "+req.query.substring+"%");
	var query = "SELECT full_name, picture from `accounts` WHERE full_name LIKE "+substring1+" || full_name LIKE "+substring2;

	connection.connect();
	connection.query(query,function(err,rows){
		if(err){
			console.log(err);
			res.send("Internal server error");
		}
		else{
			if(rows[0]){
				res.send(rows);
				connection.end();
			}
			else{
				res.send("0");
				connection.end();
			}
		}
	});
});

/* TEST */
router.get('/test', function(req, res) {
	res.render('test');
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
