var express = require('express');
var router = express.Router();
var db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  //res.send('Render a page of favorites here');
  db.pokemon.findAll().then(function(pokemonFound) {
    res.render('favorites', {pokemon: pokemonFound })
  }).catch(function(error){
    res.render('something went wrong in get')
    console.error(error)
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  //res.send(req.body);
  db.pokemon.findOrCreate({
    where:{name: req.body.name}
  })
  .spread(function(poke, wasCreated) {
    res.redirect('/pokemon')
  }).catch(function(error){
    res.render('something went wrong in post')
    console.error(error)
  })
});

module.exports = router;
