var express = require('express');
var router = express.Router();
var db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then( function(pokemon) {
    res.render('index', {pokemon});
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/:id', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create({
    name: req.body.name
  }).then( function(pokemon) {
    console.log(pokemon);
    res.redirect('index');
  })
});

module.exports = router;
