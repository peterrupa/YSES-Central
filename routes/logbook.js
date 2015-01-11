module.exports = function(app,eventEmitter){
	//database
	var mysql = require('mysql');
	var pool = mysql.createPool({
		host : 'localhost',
		user : 'root',
		password : '',
		database: 'yses_central'
	});

	function reportError(res,err){
		console.log(err);
		if(!res.headersSent){
			res.sendStatus(500);
		}
	}

	app.get('/getLogbook',function(req,res){
	  var session = req.session;

	  if(session.userkey){
	    pool.getConnection(function(err,connection){
	  		var query = "SELECT accounts.username, department, first_name, message, DATE_FORMAT(`date`,'%c/%e/%Y %T') AS date, picture FROM `logbook_posts` INNER JOIN `accounts` ON logbook_posts.username=accounts.username ORDER BY id DESC LIMIT "+req.query.count+",10";

	  		connection.query(query,function(err,announcements){
	  			if(err){
	  				reportError(res,err);
	  			}
	  			else{
	          for(var i = 0; i < announcements.length; i++){
	            announcements[i]["picture"] = announcements[i]["picture"].substring(7);
	          }
	  				res.send(announcements);
	  			}
	  		});

	      connection.release();
	    });
	  }
	  else{
	    res.redirect('/');
	  }
	});

	app.post('/postLogbook',function(req,res){
	  var session = req.session;

	  if(session.userkey){
	    pool.getConnection(function(err,connection){
	      var query = "INSERT INTO `logbook_posts` (`username`, `date`, `message`) VALUES ('"+session.userkey+"', CURRENT_TIMESTAMP, "+connection.escape(req.body["message"])+");";

	      connection.query(query,function(err,result){
	        if(err){
	          reportError(res,err);
	        }
	        else{
	          //get the date to send back to client
	          connection.query("SELECT accounts.username, first_name, picture, department, DATE_FORMAT(`date`,'%c/%e/%Y %T') AS date FROM `logbook_posts` INNER JOIN `accounts` ON logbook_posts.username=accounts.username WHERE id="+result.insertId,function(err,send){
	            if(err){
	              reportError(res,err);
	            }
	            else{
	              //remove /public
	              send[0]["picture"] = send[0]["picture"].substring(7);

	              res.send(send[0]);

								var eventData = send[0];
								eventData["message"] = req.body["message"];

								eventEmitter.emit("newlogbookdb",eventData);
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
}
