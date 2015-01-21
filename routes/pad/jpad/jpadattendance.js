module.exports = function(app,pool,async){
  function reportError(res,err){
		console.log(err);
		if(!res.headersSent){
			res.sendStatus(500);
		}
	}

  app.get('/jpadattendance/content',function(req,res){
    var session = req.session;

    if(session.userkey){
      pool.getConnection(function(err,connection){
        //check if user is a JPAD member
        var query = "SELECT department FROM `accounts` WHERE username="+connection.escape(session.userkey);

        connection.query(query,function(err,department){
          if(err) reportError(res,err);
          else{
            if(department[0]["department"] != "Junior Projects and Activities"){
              res.sendStatus(403);
            }
            else{
              async.waterfall([
                function(callback){
                  //fetch list of events
                  var query = "SELECT `event`, DATE_FORMAT(`date`,'%c/%e/%Y') AS date FROM `pad_jpadsters_event` WHERE 1 ORDER BY date DESC";

                  connection.query(query,function(err,list){
                    if(err) callback(err);
                    else{
                      callback(null,list);
                    }
                  });
                },
                function(list,callback){
                  //each event check if jpadster attended or not
                  async.map(list,
                  function(jpad,callback){
                    var query = "SELECT `event` FROM `pad_jpadsters_attendance` WHERE username="+connection.escape(session.userkey)+" AND event="+connection.escape(jpad["event"]);

                    connection.query(query,function(err,result){
                      if(err) callback(err);
                      else{
                        if(result[0]){
                          jpad["didattend"] = true;
                        }
                        else{
                          jpad["didattend"] = false;
                        }
                        callback(null,jpad)
                      }
                    });
                  },
                  function(err,send){
                    if(err) callback(err);
                    else{
                      callback(null,send)
                    }
                  });
                }
              ],
              function(err,attendance){
                if(err) reportError(res,err);
                else{
                  res.render('jpadattendance',{attendance:attendance});
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
