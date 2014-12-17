var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var session = req.session;
	if(session.userkey){
		res.render('homepage', { title: 'YSES Central' });
	}
	else{
		res.render('index');
	}
});

router.get('/login', function(req, res) {
	var session = req.session;
	session.userkey = 'tricycle';
	res.redirect('/');
});

router.get('/logout', function(req, res) {
	var session = req.session;
	session.destroy();
	res.redirect('/');
});

/* TEST */
router.get('/test', function(req, res) {
	res.render('test');
});
router.post('/upload',function(req,res){
	console.log(req.files);
	res.end("File uploaded.");
});

/* CONTENT */

router.get('/-content', function(req, res) {
	res.render('index-content');
});

router.get('/1-content', function(req, res) {
	res.render('1');
});

router.get('/2-content', function(req, res) {
	res.render('2');
});

router.get('/3-content', function(req, res) {
	res.render('3');
});



module.exports = router;
