var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(data) {
  	res.render('pokemon', {pokemons: data});
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {

  db.pokemon.findOrCreate({
    where: {name: req.body.name},
    defaults: {name: req.body.name}
  }).spread(function(results, isUnique) {
    if(isUnique) {
      res.redirect('/pokemon');
    }
  });


  // db.pokemon.create({
  // 	name: req.body.name
  // }).then(function(data) {
  // 	res.redirect('/pokemon');
  // });
});

router.get('/:name', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + req.params.name;
  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body);
    res.render('show', {pokemon: pokemon});
  });
});

// DELETE /pokemon - remove favorite from pokedex db
router.delete('/:id', function(req, res) {
	db.pokemon.destroy({
		where: {id: req.params.id}
	}).then(function(data) {
		res.sendStatus(200);
	});
});

module.exports = router;
