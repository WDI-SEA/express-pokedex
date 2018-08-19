require('dotenv').config();
var bodyParser = require('body-parser');
var db = require('../models');
var express = require('express');
var request = require('request');
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(require('morgan')('dev'));


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
	console.log("catch 'em");
	db.pokemon.findAll().then(function(pokemon){
		console.log('pokemon/index');
	res.render('pokemon/index', {pokemon: pokemon});
	}).catch(function(err){
		console.log('oops', err);
		res.send('違うですよ！ ポケモン がいない');
	});
  // TODO: Get all records from the DB and render to view

});

router.post('/', function(req, res){
	db.pokemon.create(req.body).then(function(newPokemon){
		console.log('caught pokemon:', newPokemon);

		res.redirect('/pokemon');
	}).catch(function(err){
		res.send('見つけなかった...');
	})
});

router.get('/:id', function(req, res) {
	db.pokemon.findById(req.params.id).then(function(foundPokemon){
		var pokemonName = foundPokemon.name + "/";
		pokemonName = pokemonName.toLowerCase();
		var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + pokemonName;
		console.log(pokemonUrl); 
		request(pokemonUrl, function(error, response, body) {
			 console.log('error:', error);
			 console.log('statusCode:', response && response.statusCode); 
    		var pokemon = JSON.parse(body);
    		console.log(pokemon.name, pokemon.weight, pokemon.sprites.front_shiny); //getting data from JSON!!
		res.render('pokemon/show', {pokemon: pokemon});
  });
	}).catch(function(error) {
		console.log("error:", error);
		res.render("pokemon/404");
	});
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  res.send(req.body);
});

router.delete("/:id", function(req, res){
	console.log(req.params.id);
	db.pokemon.destroy({
		where: {id: req.params.id}
	}).then(function(justDestroyed){
		console.log("deleted:", justDestroyed);
		res.send("successfully deleted");
	}).catch(function(error){
		console.log("error:", error);
		res.send("yikes");
	});
});



module.exports = router;
