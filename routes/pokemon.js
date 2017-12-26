var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');
var bodyParser = require('body-parser');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
    db.pokemon_database.findAll().then(function(pokemon){
    	res.render('pokemon', {results: pokemon});
    })
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database

	db.pokemon_database.create(req.body).then(function(newPokemon){
		//Redirect always goes to root route, use it like its in index.js!
		res.redirect('pokemon');
		console.log(newPokemon.name);
		// res.redirect('/pokemon/' + newPokemon.id); //Takes to specific new article page
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
		res.render('single', {result: favoritePokemon});
	});

});


module.exports = router;
