var express = require('express');
const db = require('../models');
const { default: Axios } = require('axios');
var router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll()
  .then(pokemon => {
    res.render('pokemon/index', {pokemon: pokemon})
  }) 
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create({
    name: req.body.name
  }).then(function(poke) {
      console.log(`🌊 Created: ${poke.name}! 🌊`)
      res.redirect('/pokemon')
  })
});

//GET one pokemon
router.get('/:id', function(req, res) {
  db.pokemon.findOne({
    where: { id: req.params.id }
  })
  .then(function(pokemon) {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`)
    .then(response => {
      res.render('pokemon/show', {pokemon: pokemon, response: response})
    })
  })
});

//DELETE route for removing from favorites
router.post('/:id/delete', function(req, res) {
  db.pokemon.destroy({
    where: { id: req.params.id }
  }).then(deletedPokemon => {
    res.redirect('/pokemon')
  })
})

module.exports = router;
