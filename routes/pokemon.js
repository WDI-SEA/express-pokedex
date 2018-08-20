require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var request = require('request');
var db = require('../models');



// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
	console.log("getting pokemon");
	db.pokemon.findAll().then(function(pokemon){
		console.log('pokemon/index');
		res.render('pokemon/index', {pokemon: pokemon});
	}).catch(function(err){
		console.log('oops', err); 
		res.send('No DICE!');
	});
});


// Below is route to POST
router.post('/', function(req, res){
	db.pokemon.create(req.body).then(function(addPokemon){
		console.log('added this pokemon:', addPokemon); 
		res.redirect('/pokemon');
	}).catch(function(err){
		console.log('error happened', err); 
		res.send('you dun goofed'); 
	});
});


router.get('/:id', function(req, res){
	db.pokemon.findById(req.params.id).then(function(foundPokemon){
		var pokemonName = foundPokemon.name + "/";
		pokemonName = pokemonName.toLowerCase();
		console.log("pokemon name is", pokemonName);
		var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + pokemonName;

		request(pokemonUrl, function(error, response, body) {
			var pokemon = JSON.parse(body);
			res.render('pokemon/show', {pokemon: pokemon}); 
		})
		
	}).catch(function(err){
		console.log('err', err);
		res.render('404');
	});
});


// Below is route for DELETE
router.delete("/:id", function(req, res){
	console.log(req.params.id);
	db.pokemon.destroy({
		where: {id: req.params.id}
	}).then(function(deletePokemon){
		console.log("deleted:", deletePokemon);
		res.send("successfully deleted");
	}).catch(function(error){
		console.log("error:", error);
		res.send("did not delete");
	});
});


module.exports = router;



