var db=require('../models')
var express = require('express');
var request = require('request');
var router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.poke.findAll().then(function(favorites){
  	res.render('pokemon/index', {favorites: favorites});
  })
  
});
// get pokemon details
router.get('/:id', function(req, res) {
    // TODO: Get all records from the DB and render to view
    console.log('req.params:', req.params)
  	let pokeName = req.params.id;
    var pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${pokeName}`;
	  // Use request to call the API
	console.log('pokeurl',pokemonUrl);
	request(pokemonUrl, function(error, response, body) {
	    var pokemon = JSON.parse(body);
	    console.log(pokemon.types)
	    res.render('pokemon/show', { name: pokemon.name
	    	
	    });
	});
});

//delete a pokemon
router.post('/:id', function(req, res) {
	console.log(req.params.id)
	let pokeName = req.params.id;
	db.poke.destroy({
		where: {
			name: pokeName
		}
	}).then(function(){
		res.redirect("/pokemon")
	});
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  let pokeMon = req.body.name;
  db.poke.findOrCreate({
  	where: {
  		name:pokeMon
  	}
  }).spread(function(pokemon, created){
  	res.redirect('/pokemon');
  });
  
});

module.exports = router;
