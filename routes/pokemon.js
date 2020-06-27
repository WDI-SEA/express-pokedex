var express = require('express');
var router = express.Router();
var db = require('../models');
const { default: Axios } = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(pokemon => {
    res.render('pokemon/index', {pokemon: pokemon});
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  }).then(res.redirect('/pokemon'))
});

router.get('/:id', (req,res) => {
  var pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${req.params.id}/`
  Axios.get(pokemonUrl).then(apiResponse => {
    var stats = apiResponse.data
    res.render('pokemon/show', {
      name: stats.name,
      height: stats.height,
      weight: stats.weight,
      image: stats.sprites.front_default,
      abilities: stats.abilities
    })
  }).catch(err => {
    console.log(`🚦 ${err} 🚦`)
  })
})

router.delete('/:id', (req, res) => {
  db.pokemon.destroy({
    where: {
      name: req.params.id
    }
  }).then(res.redirect('/pokemon'))
})

module.exports = router;
