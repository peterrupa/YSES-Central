var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');

//for image processing
var im = require('gm');
var gm = im.subClass({imageMagic:true});

/* GET home page. */
router.get('/', function(req, res) {
	var session = req.session;
	if(session.userkey){
		res.render('homepage', { title: 'YSES Central' });
	}
	else{
		res.render('index');
	}
});

router.post('/login', function(req, res) {
	var session = req.session;
	session.userkey = 'tricycle';
	res.redirect('/');
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
		var mysql = require('mysql');
		var connection = mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : '',
			database: 'yses_central'
		});
		
		//connection.connect();
		
		var studentNumber = req.body["sn-year"]+"-"+req.body["sn-number"];
		
		var queryAccount = "INSERT INTO `accounts`(`username`, `password`, `first_name`, `middle_name`, `last_name`, `org_class`, `department`, `student_number`, `org_batch`, `univ_batch`, `mentor`, `birthday`, `home_address`, `college_address`, `is_exec`, `picture`) VALUES ("+connection.escape(req.body["username"])+","+connection.escape(req.body["password"])+","+connection.escape(req.body["first-name"])+","+connection.escape(req.body["middle-name"])+","+connection.escape(req.body["last-name"])+","+connection.escape(req.body["org-class"])+","+connection.escape(req.body["department"])+","+connection.escape(studentNumber)+","+connection.escape(req.body["org-batch"])+","+connection.escape(req.body["univ-batch"])+","+connection.escape(req.body["mentor"])+","+connection.escape(req.body["bday"])+","+connection.escape(req.body["homeAdd"])+","+connection.escape(req.body["collegeAdd"])+",0,"+connection.escape(newFileName)+")";
		
		var queryMenteesTable = "CREATE TABLE accounts_"+req.body["username"]+"_mentees (mentees VARCHAR(50))";
		var account_username_mentees = "accounts_"+req.body["username"]+"_mentees";
		
		connection.connect();
		//insert row into accounts
		connection.query(queryAccount,function(err){
			if(err) console.log(err);
			else{
				//insert row into accounts_username_mentees
				connection.query(queryMenteesTable,function(err){
					if(err) console.log(err);
					else{
						if(req.body["numberofmentees"] > 0){
							for(var i = 0 ; i < req.body["numberofmentees"]; i++){
								var variableName = "mentee-"+(i+1);
								var queryMenteesRow = "INSERT INTO `"+account_username_mentees+"` (`mentees`) VALUES ("+connection.escape(req.body[variableName])+")";
								
								connection.query(queryMenteesRow,function(err){
									if(err) console.log(err);
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

/* TEST */
router.get('/test', function(req, res) {
	res.render('test');
});
router.post('/upload',function(req,res){
	console.log(req.files);
	res.end("File uploaded.");
});

/* CONTENT */

router.get('/-content', function(req, res) {
	var session = req.session;
	if(session.userkey){
		res.render('homepage-content');
	}
	else{
		//edit this
		res.send("You are not allowed to view this page.");
	}
});

router.get('/1-content', function(req, res) {
	var session = req.session;
	if(session.userkey){
		res.render('1');
	}
	else{
		//edit this
		res.send("You are not allowed to view this page.");
	}
});

router.get('/2-content', function(req, res) {
	var session = req.session;
	if(session.userkey){
		res.render('2');
	}
	else{
		//edit this
		res.send("You are not allowed to view this page.");
	}
});

router.get('/3-content', function(req, res) {
	var session = req.session;
	if(session.userkey){
		res.render('3');
	}
	else{
		//edit this
		res.send("You are not allowed to view this page.");
	}
});



module.exports = router;
