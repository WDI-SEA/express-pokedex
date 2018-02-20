var express = require('express');
var request = require('request');
var db = require('../models');
var router = express.Router();

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
    db.pokemon.findAll().then(function(data) {
    	res.render('pokemon/index', {pokemon: data});
    })
});

// POST - receive the name and image url of a pokemon and add it to the database
router.post('/', function(req, res) {
    var pokeName = req.body.name;
 	//this finds out if the table has a pokemon with this name already 
  	db.pokemon.count({where: {name: pokeName}}).then(function(data) {
    //if pokemon exists, find all the information for it and display
	    if(data !== 0) {
	      db.pokemon.find({where: {name: pokeName}}).then(function(data) {
	      	console.log(data.dataValues);
	        res.redirect('/pokemon');
	      });
    	} else {
    		//if the pokemon didn't exist, it runs an API call to create it
		    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + pokeName;
			request(pokemonUrl, function(error, response, body) {
				var pokemonImage = JSON.parse(body).sprites.front_default;
				db.pokemon.create({
					name: pokeName,
					image: pokemonImage
				}).then(function(data) {
					res.redirect('/pokemon');
				});
			});
		}
	});
}); 


// GET specific pokemon ID 
router.get('/:name', function(req, res) {
	var pokeName = req.params.name;
	var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + pokeName;
	request(pokemonUrl, function(error, response, body) {
		pokeShow = JSON.parse(body);
		console.log(pokeShow);
		res.render('pokemon/show', {pokemon: pokeShow });
	});
});



// DELETE - delete the name and info of a pokemon in the database
router.delete('/:name', function(req, res) {
	db.pokemon.destroy({
		where: {name: req.params.name}
	}).then(function(data) {
		res.send('');
	});
});

module.exports = router;