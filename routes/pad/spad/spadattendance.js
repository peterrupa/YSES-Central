module.exports = function(app,async){
  //database
	var mysql = require('mysql');
	var pool = mysql.createPool({
		host : 'localhost',
		user : 'root',
		password : '',
		database: 'yses_central'
	});

  app.get('/spadattendance/content',function(req,res){
    var session = req.session;

    if(session.userkey){
      pool.getConnection(function(err,connection){
        async.parallel({
          events: function(callback){
            //fetch lists of events here
            var query = "SELECT `event` AS name, `date` FROM `pad_jpadsters_event` WHERE 1";

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
                //fetch lists of active jpads
                var query = "SELECT `username`, `first_name`, `picture` FROM `accounts` WHERE org_class='Active' AND department='Junior Projects and Activities'";

                connection.query(query,function(err,jpads){
                  if(err) callback(err);
                  else{
                    //convert it to a 1d array of strings
                    var temp = [];

                    for(var i = 0; i < jpads.length; i++){
                      var push = {
                        username: jpads[i]["username"],
                        name: jpads[i]["first_name"],
                        picture: jpads[i]["picture"].substring(7),
                        eventsAttended: []
                      };
                      temp.push(push);
                    }

                    callback(null,temp);
                  }
                });
              },
              function(jpads,callback){
                //for each jpadster, check their events attended on db
                async.map(jpads,
                function(jpad,callback){
                  var query = "SELECT `event` FROM `pad_jpadsters_attendance` WHERE username="+connection.escape(jpad["username"]);

                  connection.query(query,function(err,eventresult){
                    if(err) callback(err);
                    else{
                      //push these events to eventsAttended
                      for(var i = 0; i < eventresult.length; i++){
                        jpad["eventsAttended"].push(eventresult[i]["event"]);
                      }

                      //remove username
                      delete jpad["username"];

                      //callback completed object
                      callback(null,jpad);
                    }
                  });
                },
                function(err,jpadlist){
                  callback(null,jpadlist);
                });
              }
            ],
            function(err,jpadlist){
              //send complete list to callback
              callback(null,jpadlist);
            });

          }
        },
        function(err,send){
          if(err) reportErr(res,err);
          else{
            res.render('spadattendance',send);
          }
        });
      });
    }
    else{
      res.redirect('/');
    }
  });
}
