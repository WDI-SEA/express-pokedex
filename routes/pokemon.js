var express = require('express');
var router = express.Router();
var db = require('../models');
const axios = require('axios');


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
    .then(function(pokemon) {
    res.render('index', { pokemon });
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create(req.body)
    .then(function(poke) {
    res.redirect('/pokemon');
  });
});

router.get('/:id', function(req,res) {
  var pokemonId = parseInt(req.params.id);
  db.pokemon.findByPk(pokemonId)
    .then(function(pokemon) {
    var pokemonName = pokemon.name;

    var pokemonSpecificUrl = 'http://pokeapi.co/api/v2/pokemon/' + pokemonName + '/';
    // Use request to call the API
    axios.get(pokemonSpecificUrl)
    .then( function(apiResponse) {
    var pokemonInfo = apiResponse;
    res.render('show', {pokemonName, pokemonInfo});
    });
  });
});

module.exports = router;