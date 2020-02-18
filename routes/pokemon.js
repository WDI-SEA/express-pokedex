var express = require('express');
var router = express.Router();

var router = express.Router();
const db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll() 
  .then(function(favoritePokemon) {
    res.render('faves.ejs', { pokemon: favoritePokemon });
  })
});

router.get('/:id', function(req, res) {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`)
  .then(function(foundPokemon) {
    res.render('show.ejs', {pokemon: foundPokemon.data});
    })
  })

router.post('/', function(req, res) {
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  })
  .then(function([pokemon, created]) {
    res.redirect('/');
  })
});

router.delete('/:id', function(req, res) {
  db.pokemon.destroy({
    where: {
      name: req.params.id,
    }
  })
    .then(function(deletedPokemon) {
      res.redirect('/pokemon');
    })
})

module.exports = router;