var express = require('express');
var router = express.Router();

//database
var mysql = require('mysql');
var pool = mysql.createPool({
	host : 'localhost',
	user : 'root',
	password : '',
	database: 'yses_central'
});

router.get('/YSERs/content', function(req,res){
	var session = req.session;

	if(session.userkey){
		res.render('YSERs-content');
	}
	else{
		res.redirect('/');
	}
});

module.exports = router;
