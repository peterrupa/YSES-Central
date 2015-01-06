var express = require('express');
var router = express.Router();

router.get('/content', function(req, res) {
	var session = req.session;
	if(session.userkey){
		res.render('homepage-content');
	}
	else{
		res.redirect("/");
	}
});

module.exports = router;
