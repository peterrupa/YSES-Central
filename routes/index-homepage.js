module.exports = function(app){
	app.get('/content', function(req, res) {
		var session = req.session;
		if(session.userkey){
			res.render('homepage-content');
		}
		else{
			res.redirect("/");
		}
	});
}
