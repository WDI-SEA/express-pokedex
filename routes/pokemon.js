const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models')



router.get('/', function(req, res) {
  db.poke.findAll() 
  .then(function(favoritedPokemon) {
    res.render('faves.ejs', { pokemon: favoritedPokemon });
  })
});


  router.get('/:id', function(req, res) {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`)
    .then(function(foundPokemon) {
      res.render('show.ejs', {pokemon: foundPokemon.data});
      })
    })


router.post('/', function(req, res) {
  db.poke.findOrCreate({
    where: {
      name: req.body.name
    }
  })
  .then(function([pokemon, created]) {
    res.redirect('/');
  })
});


router.delete('/:id', function(req, res) {
  db.poke.destroy({
    where: {
      name: req.params.id,
    }
  })
    .then(function(deletedPokemon) {
      res.redirect('/pokemon');
    })
})

module.exports = router;

