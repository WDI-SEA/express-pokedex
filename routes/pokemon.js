
var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(pokemon) {
    console.log(pokemon);
    res.render('favorites/allFavorites', { pokemon: pokemon });
  })
});

// GET single Pokemon Page
router.get('/:id', function(req, res) {
  var id = parseInt(req.params.id);
  db.pokemon.find({
    where: {
      id: id
    }
  }).then(function(data) {
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + data.name;
    request(pokemonUrl, function(error, response, body) {
      var favoritePokemon = JSON.parse(body);
      res.render('favorites/show', {
        favoritePokemon: favoritePokemon
      })
    })
  });
});


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create({
    name: req.body.name
  }).then(function() {
    res.redirect('/');
  });
});

router.delete('/:id', function(req, res) {
  db.pokemon.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(data) {
      console.log(data)
      res.sendStatus(200);
  });
});



module.exports = router;
