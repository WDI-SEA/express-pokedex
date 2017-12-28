var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
   	db.pokemon.findAll().then(function(pokemon){
    	res.render('pokemon/index', {pokemon: pokemon});
	});
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    db.pokemon.create(req.body).then(function(){
    	res.redirect('/pokemon');
    }); 
});

router.get('/:id', function(req, res){
	// db.pokemon.findById(req.params.id).then(function(){
	// console.log(req.params);
 	db.pokemon.findOrCreate({
 		where: { id: req.params.id }
 	}).spread(function(pokemon, created){
 		var name = pokemon.name
 	
 		console.log(name);
	// var name = 'bulbasaur';
	var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + name + '/';

    request({
    	url: pokemonUrl,
    	}, function(error, response, body) {
        	var dataObj = JSON.parse(body);
        	res.render('pokemon/show', { results: dataObj} );
   		});
    });
});
// });

//DELETE - delete from faves by name
// router.delete('/:name', function(req, res){
// 	res.send('DELETE ROUTE');
// });

module.exports = router;
