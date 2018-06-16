var express = require('express');
var request = require('request');
var router = express.Router();
var db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then( function(pokemon) {
    res.render('pokemon/index', {pokemon});
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create({
    name: req.body.name
  }).then( function(pokemon) {
    res.redirect('pokemon');
  })
});


// GET /pokemon/:id - show
router.get('/:id', function(req, res) {
  db.pokemon.find({
    where: {id: req.params.id}
  }).then( function(pokemon) {
    // look into moment.js
    var caughtAt = pokemon.createdAt;
    var url = pokeapiRequestUrlFor(pokemon.name)
    request(pokeapiRequestUrlFor(pokemon.name), function(err, resp, body) {
      var pokemon = JSON.parse(body);
      // res.send(pokemon)
      res.render('pokemon/show', {pokemon, caughtAt, id: req.params.id});
    })
  })
})

// DELETE /pokemon/:id
router.delete('/:id', function(req, res) {
  db.pokemon.destroy({
    where: {id: req.params.id}
  }).then( function(data) {
    console.log(data);
    res.sendStatus('200');
  })
})

// helper function
var pokeapiRequestUrlFor = function(name) {
  return 'http://pokeapi.co/api/v2/pokemon/' + name.toString().toLowerCase();
}

module.exports = router;
