var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');
var bodyParser = require('body-parser');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  console.log('in the GET route');
    //render favorite Pokemon
    db.pokemon.findAll().then(function(data) {
      res.render('pokemon', {pokemon: data});
    });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  console.log('in the POST route...');
    // add to database
    db.pokemon.create({
      name: req.body.name,
    }).then(function() {
      res.redirect('/pokemon');
    });
});

// GET - show a page with more info on selected pokemon
router.get('/:id', function(req, res) {
  console.log('in the GET selected route');
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + req.params.id;
  request(pokemonUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var pokemon = JSON.parse(body);
      console.log(pokemon);
      res.render('detail', { pokemon: pokemon });
    }
  });
});

// DELETE - delete Pokemon from the list
router.delete('/:name', function(req, res) {
  console.log('In the DELETE route...');
  db.pokemon.destroy({
    where: {name: req.params.name}
  }).then(function() {
    res.send('');
  });
});

module.exports = router;
