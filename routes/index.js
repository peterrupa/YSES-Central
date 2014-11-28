var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'YSES Central' });
});

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
