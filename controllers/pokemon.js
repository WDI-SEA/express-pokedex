var express = require('express');
var router = express.Router();

var db = require('../models');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(favorites){
// findAll() returns an array
    res.render('favorites.ejs', {pokemon: favorites});
  })
});
// POST - takes the name of the selected pokemon and adds it to the DB
router.post('/', function(req, res) {
  db.pokemon.create({
    name: req.body.name
  }).then(function(newFavorite){
    res.redirect('/pokemon')
  })
});

module.exports = router;
