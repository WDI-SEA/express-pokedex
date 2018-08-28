var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(function(allPokemon){
		res.render('pokemon/index', {pokemon: allPokemon});
	}).catch(function(err){
		console.log(err);
		res.send('error');
	});
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create(req.body).then(function(){
  	res.redirect('/pokemon');
  });
});

router.get('/:id', function(req, res){
	let pokeName = req.params.id;
  var pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${pokeName}`;
  
  request(pokemonUrl, function(error, response, body) {
    let pokemon = JSON.parse(body);
    res.render('pokemon/info', { name: pokemon.name, image: pokemon.sprites.front_shiny, exp: pokemon.base_experience, type: pokemon.types[0].type.name, abilities: pokemon.abilities, stats: pokemon.stats });
  });
});

module.exports = router;
