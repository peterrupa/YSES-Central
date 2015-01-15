module.exports = function(app){
  //database
	var mysql = require('mysql');
	var pool = mysql.createPool({
		host : 'localhost',
		user : 'root',
		password : '',
		database: 'yses_central'
	});

  app.get('/getBatch',function(req,res){
    pool.getConnection(function(err,connection){
      var query = "SELECT batch FROM `org_batch` WHERE 1 ORDER BY id";

      connection.query(query,function(err,batch){
        res.send(batch);
      });
      connection.release();
    });
  });
}
