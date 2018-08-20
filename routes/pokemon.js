var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(function(pokemon) {
  	console.log(pokemon);
  	res.render('pokemon/favorites', {pokemon: pokemon});
  }).catch(function(err) {
  	console.log('error');
  	res.render('404');
  });
  // res.send('Render a page of favorites here');
});

// Get details for one Pokemon
router.get('/:id', function(req, res) {
	var pokeName = req.params.id;
	var pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${pokeName}`;
	// Use request to call the API
	request(pokemonUrl, function(error, response, body) {
	  var pokemon = JSON.parse(body);
	  res.render('pokemon/show', {pokemon: pokemon, image: pokemon.sprites.front_shiny, exp: pokemon.base_experience, type: pokemon.types[0].type.name, abilities: pokemon.abilities });
	});
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  var pokeName = req.body.name;
  db.pokemon.findOrCreate({
  	where: {
  		name: pokeName
  	}
  }).spread(function(pokemon, created) {
  res.redirect('pokemon');  	
  });
});

module.exports = router;
