module.exports = function(app,async){
	//database
	var mysql = require('mysql');
	var pool = mysql.createPool({
		host : 'localhost',
		user : 'root',
		password : '',
		database: 'yses_central'
	});

	app.get('/YSERs/content', function(req,res){
		var session = req.session;

		if(session.userkey){
			res.render('YSERs-content');
		}
		else{
			res.redirect('/');
		}
	});

	//fetch YSERs data
	app.get('/getYSERs',function(req,res){
		var session = req.session;

		if(session.userkey){
			var data = req.query.data;
			data = JSON.parse(req.query.data);

			pool.getConnection(function(err,connection){
				//array containing data to be sent
				var send = [];
				async.each(data["batch"],
				function(batch,callback){
					//query the database
					var sort = data["sort"]=="ASC"?"":" DESC";
					var query = "SELECT username, first_name, full_name, picture, org_class, org_batch FROM `accounts` WHERE org_class IN ("+connection.escape(data["org_class"])+") AND org_batch="+connection.escape(batch)+" ORDER BY full_name"+sort;

					connection.query(query,function(err,info){
						if(err){
							reportError(res,err);
							callback(err);
						}
						else{
							if(info[0]){
								for(var i = 0; i < info.length; i++){
									info[i]["picture"] = info[i]["picture"].substring(7);
								}
								send.push({batch:batch,data:info});
							}
							callback();
						}
					});
				},
				function(err){
					if(err) reportError(res,err);
					else{
						res.send(send);
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
