module.exports = function(app,pool,async){
	function reportError(res,err){
		console.log(err);
		if(!res.headersSent){
			res.sendStatus(500);
		}
	}

  app.get('/jpadscores/content',function(req,res){
    var session = req.session;

    if(session.userkey){
      res.render('2');
    }
    else{
      res.redirect('/');
    }
  });
}
