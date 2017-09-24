// this is just like index.js but for all the 'pokemon routes'

var express = require('express');
var router = express.Router();// this just configures my routes
var db = require('../models');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
    res.send('Render a page of favorites here');
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    var favpokemon =req.body.value;
    console.log(req);
    db.pokemon.create({
      name: favpokemon
    }).then(function(poke) {
      console.log('created', poke.name);
  });
});
// res.send
router.post('/')
/// this exports my pokemon routes to index.js
module.exports = router;
