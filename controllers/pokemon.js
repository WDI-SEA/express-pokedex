var express = require('express');
var router = express.Router();
var db = require('../models')

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll()
  .then(function(pokemon){
    res.render('pokemon/index.ejs', {favorites: pokemon});
  })
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
   db.pokemon.create({
    name: req.body.name
  });
    res.redirect('/pokemon');
});

module.exports = router;
