var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');
// var app = express();

// app.use(express.static(path.join(__dirname, 'public')));

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(data) {
      res.render('favorites', { pokemon: data });
  });
});

// //GET - specific pokemon from home page
router.get('/:name', function(req, res) {
  var pokeName = req.params.name;
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + pokeName;
  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body);
    res.render('show', { pokemon: pokemon });
  });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create({
    name: req.body.name,
  }).then(function(data) {
    res.redirect('/');
  });
});

// DELETE - delete pokemon from favorites
router.delete('/:name', function(req, res) {
  db.pokemon.destroy({
    where: {name: req.params.name}
  }).then(function(data) {
    res.send('');
  });
});



















module.exports = router;










//
