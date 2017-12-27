var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var db = require('../models');


router.use(bodyParser.urlencoded({ extended: false }));

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    db.pokemon_database.findAll().then(function(pokemon){
    	res.render('pokemon', {results: pokemon});
    })
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {

	console.log("The name is " + req.body.name);

	db.pokemon_database.create(req.body).then(function(newPokemon){
		res.redirect('pokemon');
	}).catch(function(err){
		res.send('uh oh', err); //Incase there's an error, what it do?
	});
});


//Deleting from favorites
router.delete('/:id', function(req, res){
	db.pokemon_database.destroy({
		where: { id: req.params.id }
	}).then(function(deleted){
		res.send('We done did a delete');
	}).catch(function(err){
		console.log('An error happened', err);
		res.send('Fail');
	});
});


// INDIVIDUAL POKEMON PAGE
router.get('/:id', function(req, res){

	db.pokemon_database.findById(req.params.id).then(function(favoritePokemon){

	    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + favoritePokemon.name;
	    request(pokemonUrl, function(error, response, body) {

	    var pokeStats = {
	    	name: favoritePokemon.name,
	    	imagesrc: JSON.parse(body).sprites.front_shiny,
	    	height: JSON.parse(body).height,
	    	weight: JSON.parse(body).weight,
	    	species: JSON.parse(body).species.name,
	    	experience: JSON.parse(body).base_experience
	    }
	        res.render('single', { pokemon: pokeStats });
	    });

	});

});


module.exports = router;
