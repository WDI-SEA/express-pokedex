var express = require('express');
var router = express.Router();
var db = require('../models');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {

  db.pokemon.findAll({
  }).then(function(pokemons) {
    res.render('favorites.ejs', { favorites: pokemons})
  });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create(req.body).then(function(newPokemon) {
    res.redirect('/pokemon');
  });
});

module.exports = router;
