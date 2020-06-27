var express = require('express');
var db = require('../models')
var router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  //Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(pokemons => {
    res.render('favorite', {pokemon: pokemons})
  }).catch(error => {
    console.log(error)
  })
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  //Get form data and add a new record to DB
  db.pokemon.findOrCreate({ 
    where: { name: req.body.name}
  }).then(([pokemon, created]) => {
    console.log('created', pokemon, created)  
  })
  res.redirect('/pokemon')
});

module.exports = router;
