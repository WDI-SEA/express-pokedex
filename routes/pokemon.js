var express = require('express');
var router = express.Router();

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
	console.log(req.body);
	res.render('favorites');
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
	console.log('this should pass pokemon name', req.body);
	res.render('favorites');
});


module.exports = router;
