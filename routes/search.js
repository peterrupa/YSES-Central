module.exports = function(app){
	//database
	var mysql = require('mysql');
	var pool = mysql.createPool({
		host : 'localhost',
		user : 'root',
		password : '',
		database: 'yses_central'
	});

	//search
	app.get('/search',function(req,res){
		pool.getConnection(function(err,connection){
			var query = "SELECT username, full_name AS 'value', picture from `accounts` WHERE 1 ORDER BY full_name";

			connection.query(query,function(err,rows){
				if(err){
					console.log(err);
					res.send("Internal server error");
				}
				else{
					for(var i = 0; i < rows.length; i++){
						rows[i]["picture"] = rows[i]["picture"].substring(7);
						rows[i]["url"] = "http://localhost:8080/profile/" + rows[i]["username"];
					}
					res.send(rows);
				}
			});
			connection.release();
		});
	});
}
