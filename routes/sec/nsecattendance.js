module.exports = function(app,pool,async){
  function reportError(res,err){
		console.log(err);
		if(!res.headersSent){
			res.sendStatus(500);
		}
	}

  app.get('/nsecattendance/content',function(req,res){
    var session = req.session;

    if(session.userkey){
      pool.getConnection(function(err,connection){
        //check if user is an active member
        var query = "SELECT org_class FROM `accounts` WHERE username="+connection.escape(session.userkey);

        connection.query(query,function(err,org_class){
          if(err) reportError(res,err);
          else{
            if(org_class[0]["org_class"] != "Active"){
              res.sendStatus(403);
            }
            else{
              async.waterfall([
                function(callback){
                  //fetch list of events
                  var query = "SELECT `event`, DATE_FORMAT(`date`,'%c/%e/%Y') AS date FROM `sec_ysers_event` WHERE 1 ORDER BY date DESC";

                  connection.query(query,function(err,list){
                    if(err) callback(err);
                    else{
                      callback(null,list);
                    }
                  });
                },
                function(list,callback){
                  //each event check if yser attended or not
                  async.map(list,
                  function(yser,callback){
                    var query = "SELECT `event` FROM `sec_ysers_attendance` WHERE username="+connection.escape(session.userkey)+" AND event="+connection.escape(yser["event"]);

                    connection.query(query,function(err,result){
                      if(err) callback(err);
                      else{
                        if(result[0]){
                          yser["didattend"] = true;
                        }
                        else{
                          yser["didattend"] = false;
                        }
                        callback(null,yser)
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
                  res.render('nsecattendance',{attendance:attendance});
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
