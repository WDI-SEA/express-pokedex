var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(function(data) {
    res.render('pokemon', {pokemon: data})
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create({
    name: req.body.name,
  }).then(function(data) {
    res.redirect('pokemon');
  });
});

// GET /pokemon - display pokemon by itself
router.get('/:name', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + req.params.name;
  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body);
    console.log(pokemon)
    res.render('show', {pokemon: pokemon});
    // res.send(pokemon)
  });
});

// DELETE /pokemon - delete pokemon from favorites
router.delete('/:id', function(req, res) {
  db.pokemon.destroy({
    where: {id: req.params.id}
  }).then(function(data) {
    console.log(data);
    res.sendStatus(200);
  })
});

module.exports = router;
