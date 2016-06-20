var express = require('express');
var router = express.Router();
var db = require('../models');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll({})
    .then(function(poke) {
      res.render('./pokemon/index', { poke: poke } );
    })
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {

  query = {
    pokemon: req.body.name
  };
  db.pokemon.create(query)
    .then(function(newPoke) {
      res.redirect('/pokemon');
    });

});

router.post('/delete', function(req, res) {
  // res.send(req.body);
  query = {
    where: { pokemon: req.body.name }
  };
  db.pokemon.destroy(query)
    .then(function(poke) {
      res.redirect('/');
    });


})

module.exports = router;
