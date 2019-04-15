var express = require('express');
var router = express.Router();
var db = require('../models');


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  // db.pokies2.findAll()
  // .then((poke) => {
  //   res.render('pokemon/index', { pokemon: poke } );
  // });

});

router.delete((req, res) => {
  db.pokies2.find().then((pokeToRemove) => {
    db.pokies2
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  // db.pokies2.create(req.body)
  // .then((poke) => {
  //   console.log('Created: ', poke.number);
  //   res.redirect('pokemon/index')
  // });

});

module.exports = router;
