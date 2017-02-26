var express = require('express');
var router = express.Router();
var db = require('.././models');
// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
	db.pokemon.findAll()
	.then(function(result) {
		res.render('favorites', {result: result});
	})
	.catch(function(error) {
		res.send('there has been an error');
	})
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {

	db.pokemon.create(req.body)
	.then(function(favs){
		// res.redirect('favorites');
		res.status(200);
	});
});


module.exports = router;
