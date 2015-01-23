module.exports = function(app,pool,request){
	function serveMain(req,res){
		var session = req.session;

		pool.getConnection(function(err,connection){
			connection.query("SELECT username, first_name, picture FROM `accounts` WHERE username="+connection.escape(session.userkey),function(err,rows){
				if(err) console.log(err);
				else{
					res.render('main',{username: rows[0]["username"],name: rows[0]["first_name"],picture: rows[0]["picture"].substring(7)});
				}
			});
			connection.release();
		});
	}

	//homepage
	app.get('/', function(req, res) {
		var session = req.session;

		if(session.userkey){
			serveMain(req,res);
		}
		else{
			var url = req.protocol + '://' + req.get('host') + req.originalUrl.substring(1);
			//get list of batches for signup
			request(url + '/getBatch',function(error,response,body){
				if (!error && response.statusCode == 200) {
			    res.render('index',{batch:body});
			  }
			});
		}
	});

	//profiles
	app.get('/profile/:username',function(req,res){
		var session = req.session;
		if(session.userkey){
			serveMain(req,res);
		}
		else{
			res.redirect('/');
		}
	});

	//view all YSERs
	app.get('/YSERs', function(req,res){
		var session = req.session;
		if(session.userkey){
			serveMain(req,res);
		}
		else{
			res.redirect('/');
		}
	});

	//exec system
	//account validator
	app.get('/accountvalidator', function(req,res){
		var session = req.session;
		if(session.userkey){
			serveMain(req,res);
		}
		else{
			res.redirect('/');
		}
	});

	//announcementposter
	app.get('/announcementposter', function(req,res){
		var session = req.session;
		if(session.userkey){
			serveMain(req,res);
		}
		else{
			res.redirect('/');
		}
	});

	//pad system
	app.get('/padattendance',function(req,res){
		var session = req.session;
		if(session.userkey){
			serveMain(req,res);
		}
		else{
			res.redirect('/');
		}
	});

	app.get('/spadattendance', function(req,res){
		var session = req.session;
		if(session.userkey){
			serveMain(req,res);
		}
		else{
			res.redirect('/');
		}
	});

	app.get('/jpadattendance', function(req,res){
		var session = req.session;
		if(session.userkey){
			serveMain(req,res);
		}
		else{
			res.redirect('/');
		}
	});

	app.get('/padscores',function(req,res){
		var session = req.session;
		if(session.userkey){
			serveMain(req,res);
		}
		else{
			res.redirect('/');
		}
	});

	app.get('/spadscores', function(req,res){
		var session = req.session;
		if(session.userkey){
			serveMain(req,res);
		}
		else{
			res.redirect('/');
		}
	});

	app.get('/jpadscores', function(req,res){
		var session = req.session;
		if(session.userkey){
			serveMain(req,res);
		}
		else{
			res.redirect('/');
		}
	});

	//sec system
	app.get('/attendance',function(req,res){
		var session = req.session;
		if(session.userkey){
			serveMain(req,res);
		}
		else{
			res.redirect('/');
		}
	});

	app.get('/secattendance',function(req,res){
		var session = req.session;
		if(session.userkey){
			serveMain(req,res);
		}
		else{
			res.redirect('/');
		}
	});

	app.get('/nsecattendance',function(req,res){
		var session = req.session;
		if(session.userkey){
			serveMain(req,res);
		}
		else{
			res.redirect('/');
		}
	});

	//scho system
	app.get('/checklist',function(req,res){
		var session = req.session;
		if(session.userkey){
			serveMain(req,res);
		}
		else{
			res.redirect('/');
		}
	});

	app.get('/schochecklist',function(req,res){
		var session = req.session;
		if(session.userkey){
			serveMain(req,res);
		}
		else{
			res.redirect('/');
		}
	});

	app.get('/nschochecklist',function(req,res){
		var session = req.session;
		if(session.userkey){
			serveMain(req,res);
		}
		else{
			res.redirect('/');
		}
	});

	/* TEST */
	app.get('/test', function(req, res) {
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

	app.get('/3/content', function(req, res) {
		var session = req.session;
		if(session.userkey){
			res.render('3');
		}
		else{
			//edit this
			res.redirect("/");
		}
	});
};
//module.exports = router;
