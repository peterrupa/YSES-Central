module.exports = function(app,pool,async){
  function reportError(res,err){
		console.log(err);
		if(!res.headersSent){
			res.sendStatus(500);
		}
	}

  app.get('/nschochecklist/content',function(req,res){
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
              res.render('3');
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

//fetch list of sems
//fetch user data
  //each sem
    //get grades

// {
//   sems: [
//     {
//       name: '1st Sem 2014-2015',
//       subjects: [
//         {
//           name: 'CMSC 2',
//           grade: 1.00,
//           units: 3.0
//         }
//       ]
//     }
//   ]
// }
