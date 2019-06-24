var express = require('express');
var router = express.Router();
const axios = require('axios'); 
var db = require('../models'); // have to go up a directory and then down into models

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(pokemon) {
    res.render('pokemon', {pokemon});
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create({
    name: req.body.name
  }).then(function (data) {
    console.log(data.dataValues.name)
    res.redirect('pokemon');
  });
});

// GET /pokemon id. Gets one pokemon id from the database and uses it to look up details
// about that one pokemon. 
router.get('/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);

  db.pokemon.findByPk(id).then(function(pokemon) {
    var pokemonName = pokemon.name;
    var pokemonURL = 'pokeapi.co/api/v2/pokemon' + pokemonName;

    axios.get(pokemonURL).then(function (apiResponse) {
      var pokemon = apiResponse.data;
      res.render('show', { pokemon} );
    });
  });
});

module.exports = router;
