var express = require('express');
var request = require('request');
var fs = require('fs');
var models = require('../models');
var router = express.Router();

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
    models.pokemon.findAll().then(function(pokemon) {
    res.render('pokemon/favorites', {
      pokemon: pokemon });
  });
  
})


// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database
    // Check if favorite exists in database

    var favorites = models.pokemon.findAll({where: {name: req.body.name}});
    console.log(favorites);
    if(favorites.length = 0){
    	models.pokemon.create({ name: req.body.name }).then(function() {
    		res.redirect('/');
    	});
    } else {
    	res.redirect('/');
    }


});

// GET -  return a page with more information about a specific pokemon
router.get('/:id', function(req, res) {
	var pokeURL = "http://pokeapi.co/api/v2/pokemon/" + req.params.id;
	request(pokeURL, function(error, response, body) {
		// Get all data
		var data = JSON.parse(body)

		// Retrieve pokemon name
		var name = data.forms[0].name;
		// Retrieve pokemon speed
		var speed = data.stats[0].base_stat;

		// Ability
		//var ability = data.abilities[0];
		var abilities = data.abilities[0][Object.keys(data.abilities[0])[Object.keys(data.abilities[0]).length-1]]
		var ability = abilities.name
		
		// Retrieve Pokemon Image
		var sprite = data.sprites;
		var image_front = sprite[Object.keys(sprite)[Object.keys(sprite).length -1]]
		var image_back = sprite[Object.keys(sprite)[Object.keys(sprite).length -3]]
		

		//var form[0].name);
		//console.log('body', form[name]);
    	
        //var pokemon = JSON.parse(body).results;
        res.render('pokemon/single', {
        	name: name,
        	speed: speed,
        	ability: ability,
        	image_front: image_front,
        	image_back: image_back
        });
    });

})

module.exports = router;

