var express = require('express');
var router = express.Router();
var db = require('../models');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(favorites) {
//Grab all favorites and put them on favorites page
  res.render('favorites.ejs', { pokemon: favorites });
  })
});


// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create({
    name: req.body.name
  }).then(function(newFavorite) {
    res.redirect('/pokemon');
  });
});

module.exports = router;
