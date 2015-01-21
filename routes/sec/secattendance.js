module.exports = function(app,pool,async){
	function reportError(res,err){
		console.log(err);
		if(!res.headersSent){
			res.sendStatus(500);
		}
	}

  app.get('/secattendance/content',function(req,res){
    var session = req.session;

    if(session.userkey){
      pool.getConnection(function(err,connection){
				//be sure user is an sec member before doing stuffs!
				var query = "SELECT department FROM `accounts` WHERE username="+connection.escape(session.userkey);

				connection.query(query,function(err,department){
					if(err) reportError(res,err);
					else{
						if(department[0]["department"] != "Secretariat"){
							res.sendStatus(403);
						}
						else{
							async.parallel({
			          events: function(callback){
			            //fetch lists of events here
			            var query = "SELECT `event` AS name, DATE_FORMAT(`date`,'%c/%e/%Y') AS date FROM `sec_ysers_event` WHERE 1 ORDER BY date";

			            connection.query(query,function(err,event){
			              if(err) callback(err);
			              else{
			                callback(null,event);
			              }
			            });
			          },
			          attendance: function(callback){
			            async.waterfall([
			              function(callback){
			                //fetch lists of active ysers
			                var query = "SELECT `username`, `first_name`, `picture` FROM `accounts` WHERE org_class='Active' ORDER BY `first_name`";

			                connection.query(query,function(err,ysers){
			                  if(err) callback(err);
			                  else{
			                    var temp = [];

			                    for(var i = 0; i < ysers.length; i++){
			                      var push = {
			                        username: ysers[i]["username"],
			                        name: ysers[i]["first_name"],
			                        picture: ysers[i]["picture"].substring(7),
			                        eventsAttended: []
			                      };
			                      temp.push(push);
			                    }

			                    callback(null,temp);
			                  }
			                });
			              },
			              function(ysers,callback){
			                //for each yser, check their events attended on db
			                async.map(ysers,
			                function(yser,callback){
			                  var query = "SELECT `event` FROM `sec_ysers_attendance` WHERE username="+connection.escape(yser["username"]);

			                  connection.query(query,function(err,eventresult){
			                    if(err) callback(err);
			                    else{
			                      //push these events to eventsAttended
			                      for(var i = 0; i < eventresult.length; i++){
			                        yser["eventsAttended"].push(eventresult[i]["event"]);
			                      }

			                      //remove username
			                      delete yser["username"];

			                      //callback completed object
			                      callback(null,yser);
			                    }
			                  });
			                },
			                function(err,yserlist){
			                  callback(null,yserlist);
			                });
			              }
			            ],
			            function(err,yserlist){
			              //send complete list to callback
			              callback(null,yserlist);
			            });
			          }
			        },
			        function(err,send){
			          if(err) reportErr(res,err);
			          else{
			            res.render('secattendance',send);
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
