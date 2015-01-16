module.exports = function(app){
  //database
	var mysql = require('mysql');
	var pool = mysql.createPool({
		host : 'localhost',
		user : 'root',
		password : '',
		database: 'yses_central'
	});

  app.get('/padattendance/content',function(req,res){
    var session = req.session;

    if(session.userkey){
      pool.getConnection(function(err,connection){
        //check what kind of member
        var query = "SELECT `department` FROM `accounts` WHERE username="+connection.escape(session.userkey);

        connection.query(query,function(err,department){
          if(department[0]["department"] == "Senior Projects and Activities"){
            res.redirect('/spadattendance/content');
          }
          else if(department[0]["department"] == "Junior Projects and Activities"){
            res.redirect('/jpadattendance/content');
          }
          else{
            res.render('forbidden');
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
