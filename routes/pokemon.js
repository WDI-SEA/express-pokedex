var express = require('express');
var router = express.Router();
const db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view


db.pokemon.findAll()
.then(function(pokemon) {
  console.log('Found: ', pokemon.name)
})
  res.render('./favorites.ejs', {
    name: name
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  
db.pokemon.create(req.body).then(function(poke) {
  console.log('Created: ', poke.name)
})
  res.redirect('/pokemon');
});

module.exports = router;


