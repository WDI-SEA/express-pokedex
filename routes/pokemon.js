var express = require('express');
const db = require('../models');
var router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.Pokemon.findAll().then(function(Pokemons) {
    res.render('favorites', { pokemon: pokemons })
  }).catch(err => {
    console.log(err)
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.Pokemon.findOrCreate({
    where: {
      name: req.body.name
    },
    defaults: {
      url: req.body.url
    }
  }).then(function([pokemon, created]) {
    console.log("added", created)
    res.redirect('/pokemon')
  }).catch(err => {
    console.log(err)
  })
});

module.exports = router;
