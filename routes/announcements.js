module.exports = function(app,pool){
	function reportError(res,err){
		console.log(err);
		if(!res.headersSent){
			res.sendStatus(500);
		}
	}

	app.get('/getAnnouncements',function(req,res){
	  pool.getConnection(function(err,connection){
			var query = "SELECT `department`, `message`, DATE_FORMAT(`date`,'%c/%e/%Y %T') AS date, `title` FROM `announcement_posts` ORDER BY id DESC LIMIT "+req.query.count+", 5";

			connection.query(query,function(err,announcements){
				if(err){
					reportError(res,err);
				}
				else{
					res.send(announcements);
				}
			});

	    connection.release();
	  });
	});
}
