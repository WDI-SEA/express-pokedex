var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
	db.pokemon.findAll().then(function(favepoke){
		res.render('pokemon/index.ejs', {results: favepoke});
	});
});

router.get('/:id', function(req, res) {
	db.pokemon.findById(req.params.id).then(function(pokemon) {
		if(pokemon) {
			var name = pokemon.name;
			var pokemonURL = 'http://pokeapi.co/api/v2/pokemon/'+name.toLowerCase()+'/';
			request(pokemonURL, function(error, response, body) {
				if (!error && response.statusCode == 200) {
    				var fullPokeData = JSON.parse(body);
    				var data = {
    					name: fullPokeData.name.toUpperCase(),
    					abilities: fullPokeData.abilities,
    					weight: fullPokeData.weight,
    					sprites: fullPokeData.sprites
    				};
					res.render('pokemon/show.ejs', data);
    			}
			});
		} else {
			res.status(404).send('404 error');
		}
	}).catch(function(err) {
		res.status(500).send('500 error');
		console.log(err);
	});
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
	db.pokemon.create(req.body).then(function(newFave){
		res.redirect('/pokemon');
	}).catch(function(err){
		res.send('Well that did not go as planned', err);
	});
});

module.exports = router;
