var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then((favePokemon) => {
  	res.render('favorites', {favePokemon: favePokemon})
  })
  .catch((err) => {
  	console.log('fave', err)
  	res.send('Error, check your logs!')
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
  	where: {name: req.body.name}
  	}).spread((pokemon, created) => {
  		res.redirect('/pokemon');
  	})
});


// Show route
router.get('/:id', (req, res) => {
	var findName = db.pokemon.findById(parseInt(req.params.id))
	.then((pokeName) => {
		var resultUrl = 'http://pokeapi.co/api/v2/pokemon/'+ pokeName.name.toLowerCase();
		request(resultUrl, function (error, response, body) {
			var pokemonData = JSON.parse(body);
			res.render('show', {pokemon: pokemonData});
		})
	});

	
});

module.exports = router;
