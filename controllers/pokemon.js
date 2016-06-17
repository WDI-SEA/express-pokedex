var express = require('express');
var router = express.Router();
var db = require('../models');


// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll({
  }).done(function(pokeFav) {
  res.render('pokemon.ejs', { Favorites: pokeFav });
  });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create({
    name: req.body.name
  }).done(function(pokeName) {
  res.redirect('/pokemon');
  });
});


module.exports = router;
