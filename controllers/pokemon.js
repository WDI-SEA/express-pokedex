var express = require('express');
var router = express.Router();
var db = require('../models');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.favoritePokemon.findAll().then(function(pokemon){
  res.render('index', {pokemon: pokemon});
  });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  res.send(req.body);
});

module.exports = router;
