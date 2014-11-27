var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
	res.send('respond with a resource');
});

router.get('/go',function(req, res){
	res.render('test');
});

module.exports = router;
