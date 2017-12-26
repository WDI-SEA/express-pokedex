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
    models.pokemon.create({ name: req.body.name }).then(function() {
    res.redirect('/');
  });
});

// GET -  return a page with more information about a specific pokemon
router.get('/:id', function(req, res) {
	var pokeURL = "http://pokeapi.co/api/v2/pokemon/" + req.params.id;
	request(pokeURL, function(error, response, body) {
		var data = JSON.parse(body)
		var form = data.forms
		console.log('body', form[0].name);
		//console.log('body', form[name]);
    	
        //var pokemon = JSON.parse(body).results;
        res.render('pokemon/single');
    });

})

module.exports = router;

