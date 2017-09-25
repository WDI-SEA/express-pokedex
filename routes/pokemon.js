
// this is just like index.js, but for all the '/pokemon routes'
var express = require('express');
var request = require('request');
var db = require('../models');
var router = express.Router(); // this just configures my routes

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(pokemon) {
    res.render('pokemon/index', {pokemon: pokemon});
  });
});

router.get('/info/:name', function(req, res) {

});

router.get('/:name', function(req, res) {
  db.pokemon.find({
    where: {
      name: req.params.name
    }
  }).then(function(pokemon) {
    res.render('pokemon/show', {pokemon: pokemon});
  });
});

router.get('/search/:name', function(req, res) {
  var apiUrl = 'http://pokeapi.co/api/v2/pokemon/' + req.params.name;
  request(apiUrl, function(error, response, body) {
    var pokemon = JSON.parse(body);
    console.log(pokemon);
    res.render('show', { pokemon: pokemon });
  });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  console.log(req.body.name);
    db.pokemon.findOrCreate({
      where: {
        name: req.body.name
      }
    }).then(function(data) {
      res.redirect('/pokemon');
    })
});

router.delete('/', function(req, res) {
  db.pokemon.destroy({
    where: {
      name: req.params.name
    },
    limit: 1
  }).then(function() {
    db.pokemon.findAll().then(function(pokemon) {
      res.redirect('/pokemon/index', {pokemon: pokemon});
    });
  });
});

module.exports = router;
