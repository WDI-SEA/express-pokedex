const express = require('express');
const router = express.Router();
const db = require('../models');
const request = require('request');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(function(pokemon) {
    res.render('pokemon/pokedex', {pokemon})
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({ 
    where: {
      name: req.body.name
    }
  }).spread( function() {
    res.redirect('/pokemon'); 
  });
});

// GET to API to view individual pokemon, show route
router.get('/:name', function(req, res) {
  let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + req.params.name.toLowerCase();
  // Use request to call the API
  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body);
    let speciesURL = pokemon.species.url;
    request(speciesURL, function(error, response, body) {
      var species = JSON.parse(body);
      let evolutionChainURL = species.evolution_chain.url;
      request(evolutionChainURL, function(error, response, body) {
        var evolution = JSON.parse(body);
        if (evolution.chain.evolves_to.length) {
          var evolvedName = evolution.chain.evolves_to[0].evolves_to[0].species.name;
          let evolvedAPI = 'http://pokeapi.co/api/v2/pokemon/' + evolvedName;
          request(evolvedAPI, function(error, response, body) {
            var evolvedPokemon =  JSON.parse(body);
            res.render('pokemon/show', {pokemon, species, evolution, evolvedPokemon});
          });
        };
      });
    });
  });
});

router.delete('/:name', function (req, res) {
  db.pokemon.destroy({
      where: { name: req.body.name }
  }).then( function() {
    res.redirect('/pokemon');
  });
});

module.exports = router;
