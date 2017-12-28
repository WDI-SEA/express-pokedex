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

	var catchPokemon = Math.floor(Math.random() * 10) + 1;

	if (catchPokemon % 2 === 0) {
		db.pokemon_database.create(req.body).then(function(place) {
        	res.redirect('pokemon');
    	}).catch(function(err) {
        	res.send({ message: 'error', error: err });
   		});
	} else {
		console.log("You didn't catch the pokemon");
		// Remove event listener?
		res.redirect('/play');
	}

});

//Deleting from library
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

		// Pulls data from the database
	    var pokeStats = {
	    	id: favoritePokemon.id,
	    	name: favoritePokemon.name,
	    	imagesrc: favoritePokemon.imagesrc,
	    	height: favoritePokemon.height,
	    	weight: favoritePokemon.weight,
	    	experience: favoritePokemon.experience
	    }
	        res.render('single', { pokemon: pokeStats });
	    });

});


module.exports = router;
