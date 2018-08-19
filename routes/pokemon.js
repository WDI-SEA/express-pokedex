var express = require('express');
var router = express.Router();

// models/index.js exports db
var db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // get list of pokemon
  db.pokemon.findAll().then(function(pokemons) {
    console.log('fulfilled promise from pokemon.findAll()', pokemons);
    pokemons.forEach(function(pokemon) {
      console.log('an ele in pokemons[]', pokemon);
      console.log('dataValues of ele:', pokemon.dataValues);
      console.log('name of pokemon:', pokemon.dataValues.name);
    });
    res.render('pokemon/index');
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  res.send(req.body);
});

/** @suppress {missingRequire} */
module.exports = router;
