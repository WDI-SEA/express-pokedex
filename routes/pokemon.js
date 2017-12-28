var express = require('express');
var router = express.Router();
var db = require ('../models');
var request = require('request');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
    db.pokemon.findAll().then(function(result){
    	  res.render('favorites', {result: result});
    });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database
    db.pokemon.create({
    	name: req.body.name
    }).then(function(){
    	res.redirect('/pokemon');
    });
});

//GET - return a page with favorite pokemon's stats
router.get('/:name', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/'+ req.params.name;
  request(pokemonUrl, function(error, response, body) {
  	var pokemon = JSON.parse(body);
    res.render('show', { pokemon: pokemon });
  });
});

// Delete - remove pokemon from db and favorites page
router.delete('/:name', function(req, res){

	db.pokemon.destroy({
		where: {name: req.params.name}
	}).then(function(deleted){
		console.log('deleted = ', deleted);
		res.send('sucesss');
	}).catch(function(err){
		console.log('An error happened', err);
		res.send('fail');
	});
});


module.exports = router;
