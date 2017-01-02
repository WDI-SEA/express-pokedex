var express = require('express');
var request = require('request');
var router = express.Router();
var db = require('../models');
// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(pokemons) {
    res.render('favorite', { pokemons: pokemons });
  });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create(req.body).then(function(pokemon) {
    res.redirect('/pokemon');
  });
});

router.get('/:name', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + req.params.name + '/';

  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body);
    res.render('pokemon', { pokemon: pokemon });
  });
});

router.delete('/:id', function(req, res) {
  db.pokemon.findById(req.params.id).then(function(pokemon) {
    pokemon.destroy();
    res.send('Done!!!');
  });
});

module.exports = router;
