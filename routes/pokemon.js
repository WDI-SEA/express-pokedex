var express = require('express');
var router = express.Router();
var db = require('.././models');
var request = require('request');

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
	.then(function(){
		res.redirect('/pokemon');
	});
});

router.get('/:name', function(req, res) {
	var url = 'http://pokeapi.co/api/v2/pokemon/' + req.params.name;
	request({
		url: url
	}, function(error, response, body) {
		var result = JSON.parse(body);
		res.render('singlePokemon', {result: result});
	});

});
// DELETE
router.delete('/:name', function(req, res) {
	db.pokemon.destroy({
		where: {name: req.params.name}
	}).then(function() {
		res.sendStatus(200);
	})
})


module.exports = router;
