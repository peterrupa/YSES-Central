module.exports = function(app,pool){
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
						rows[i]["url"] = "/profile/" + rows[i]["username"];
					}
					res.send(rows);
				}
			});
			connection.release();
		});
	});
}
