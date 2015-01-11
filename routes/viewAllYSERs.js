module.exports = function(app){
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

	app.get('/getYSERs', function(req,res){
		var session = req.session;

		if(session.userkey){
			pool.getConnection(function(err,connection){
				var filterBatch, filterClass;

				//determine filters
				//batch
				req.query.filterBatch = req.query.filterBatch.split(';')
				for(var i = 0; i < req.query.filterBatch.length; i++){
					if(i == 0){
						filterBatch = "org_batch = "+connection.escape(req.query.filterBatch[i]);
					}
					else{
						filterBatch += "|| org_batch = "+connection.escape(req.query.filterBatch[i]);
					}
				}

				//class
				req.query.filterClass = req.query.filterClass.split(';')
				req.query.filterClass.sort();
				for(var i = 0; i < req.query.filterClass.length; i++){
					if(i == 0){
						filterClass = "org_class = "+connection.escape(req.query.filterClass[i]);
					}
					else{
						filterClass += "|| org_class = "+connection.escape(req.query.filterClass[i]);
					}
				}

				//determine sort
				var sort;

				if(req.query.sort == "ASC"){
					sort = "ORDER BY full_name";
				}
				else{
					sort = "ORDER BY full_name DESC";
				}

				connection.query("SELECT username, first_name, full_name, picture, org_class, org_batch FROM `accounts` WHERE ("+filterBatch+") AND "+filterClass+" "+sort,function(err,data){
					if(err){
						console.log(err);
						res.send("Internal Server Error");
					}
					else{
						//remove public from pictures
						for(var i = 0; i < data.length; i++){
							data[i]["picture"] = data[i]["picture"].substring(7);
						}

						//inefficient shit, please fix later
						var result = {};
						for(var i = 0; i < req.query.filterBatch.length; i++){
							//for each batch let's make a temporary array to store the members
							members = [];
							for(var j = 0; j < data.length; j++){
								if(data[j]["org_batch"] == req.query.filterBatch[i]){
									members.push(data[j]);
								}
							}
							result[req.query.filterBatch[i]] = members;
						}
						res.send(result);
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
