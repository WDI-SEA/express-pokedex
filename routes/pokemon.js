var express = require('express');
const axios = require('axios');
var router = express.Router();
const db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll() 
  .then(function(favoritedPokemon) {
    res.render('faves.ejs', { pokemon: favoritedPokemon });
  })
});

router.get('/:id', function(req, res) {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`)
  .then(function(foundPokemon) {
    // res.send(foundPokemon);
    res.render('show.ejs', {pokemon: foundPokemon.data});
    })
    // .catch(err=>console.log(err));
  })

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  })
  .then(function([pokemon, created]) {
    console.log(`${pokemon} was ${created ? 'created' : 'found'}`);
    res.redirect('/pokemon');
  })
  // res.send(req.body);
});

module.exports = router;
