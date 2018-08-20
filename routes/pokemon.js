var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
	db.pokemon.findAll().then(function(favorites) {
		res.render('pokemon/index', { favorites: favorites });
	});
});

router.get('/:id', function(req, res) {
	let pokeName = req.params.id;
	var pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${pokeName}`;
 	// Use request to call the API
	request(pokemonUrl, function(error, response, body) {
    	var pokemon = JSON.parse(body);
    	res.render('pokemon/show', { name: pokemon.name, image: pokemon.sprites.front_shiny, 
    		image2: pokemon.sprites.front_default, exp: pokemon.base_experience, type: pokemon.types[0].type.name, 
    		abilities: pokemon.abilities, stats: pokemon.stats });
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
	let pokeName = req.body.name;
	db.pokemon.findOrCreate({
		where: {
			name: pokeName
		}
	}).spread(function(pokemon, created) {
		res.redirect('pokemon');
	})
});

// Delete a pokemon from our database
router.post('/:id', function(req, res) {
	let pokeName = req.params.id;
	console.log('pokeName:', pokeName);
	db.pokemon.destroy({
		where: {
			name: pokeName
		}
	}).then(function() {
		res.redirect('/pokemon');
	})
});

module.exports = router;
