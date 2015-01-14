module.exports = function(app,eventEmitter){
	//file
	var fs = require('fs');

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

	app.get('/announcementposter/content', function(req,res){
	  var session = req.session;

	  if(session.userkey){
	    //identify first if user is an exec member
	    pool.getConnection(function(err,connection){
				var username = connection.escape(session.userkey);
	      var query = "SELECT username from `accounts` WHERE username="+username+" && org_class='Active' && exec_position IS NOT NULL";

				connection.query(query,function(err,result){
					if(err){
						reportError(res,err);
					}
					else{
						if(result[0]){
							res.render('announcementposter')
						}
						else{
							res.send('You are not allowed to view this.');
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

/* OPTIMIZE, WATERFALLS */

	app.post('/postAnnouncements',function(req,res){
	  var session = req.session;

	  if(session.userkey){
	    pool.getConnection(function(err,connection){
	      //get posters department
	      var query = "SELECT department FROM `accounts` WHERE username="+connection.escape(session.userkey);
	      connection.query(query,function(err,department){
	        if(err){
	          reportError(res,err);
	        }
	        else{
	          var department = department[0]["department"];
	          var query = "INSERT INTO `announcement_posts`(`department`, `message`, `date`, `title`) VALUES ("+connection.escape(department)+","+connection.escape(req.body["message"])+",CURRENT_TIMESTAMP,"+connection.escape(req.body["title"])+")";
	          connection.query(query,function(err,result){
	            if(err){
	              reportError(res,err);
	            }
	            else{
	              //get the date to send back to client
	              connection.query("SELECT DATE_FORMAT(`date`,'%c/%e/%Y %T') AS date FROM `announcement_posts` WHERE id="+result.insertId,function(err,date){
	                if(err){
	                  reportError(res,err);
	                }
	                else{
										var sendData = {title:req.body["title"],message:req.body["message"],department:department,date:date[0]["date"]};
	                  res.send(sendData);

										//emit server event for socket updates
										eventEmitter.emit('announcementpost',sendData);
	                }
	              });
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
