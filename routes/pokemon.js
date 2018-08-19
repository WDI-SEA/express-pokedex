var express = require('express');
var router = express.Router();

// models/index.js exports db
var db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // declare list of pokemon names to be sent
  var nameList = [];
  // get list of pokemon from database
  db.pokemon.findAll().then(function(pokemons) {
    // console log entirety of fulfilled promise
    console.log('fulfilled promise from pokemon.findAll()', pokemons);
    pokemons.forEach(function(pokemon) {
      // console log structure of data returned
      console.log('an ele in pokemons[]', pokemon);
      console.log('dataValues of ele:', pokemon.dataValues);
      console.log('name of pokemon:', pokemon.dataValues.name);
      // add pokemon name to name list
      nameList.push(pokemon.dataValues.name);
    });
    // render pokemon index with all names sent for page to use
    res.render('pokemon/index', { nameList: nameList });
  }).catch(function(err) {
    console.log('fetch index of pokemon from db failed with err', err);
    res.send('awesome 404 page, enjoy it');
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  res.send(req.body);
});

/** @suppress {missingRequire} */
module.exports = router;
