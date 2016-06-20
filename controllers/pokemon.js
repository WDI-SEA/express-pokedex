var express = require('express');
var router = express.Router();
var database = require("../models");

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  database.pokemon.findAll().then(function(allPokemon) {
    //res.send(allPokemon)
     res.render('pokemon', { pokemon: allPokemon });
  });

  // res.send('Render a page of favorites here');
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  database.pokemon.create({
  name: req.body.name
}).then(function(newPokemon) {
  console.log(newPokemon.get());
  res.redirect('/pokemon')
});



});

module.exports = router;
