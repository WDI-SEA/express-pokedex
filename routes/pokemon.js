var express = require('express');
var router = express.Router();
const request = require('request');
var db = require('../models');
var app = express();


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then( function(pokemon) {
    res.render('favorite', {pokemon})
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create({
    name: req.body.name //want to update name in db and its values
  }).then(function() {
    res.redirect('pokemon') //this will go into  the above get route
  })
  // TODO: Get form data and add a new record to DB
  
});

//SHOW ONE POKEMON
router.get('/:name', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + req.params.name;
    request(pokemonUrl, function(error, response, body) {
      var pokemonInfo = JSON.parse(body);
      res.render('show', {pokemon: pokemonInfo});
    });
});


module.exports = router;
//anything attached to router gets exported
