const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models')
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151';
const BASE_POKE_URL = 'http://pokeapi.co/api/v2/pokemon/';
const BASE_SPECIES_URL = 'https://pokeapi.co/api/v2/pokemon-species/'

// GET / - main index of site
router.get('/', function(req, res) {
  // Use request to call the API
  axios.get(BASE_URL).then( function(apiResponse) {
    var pokemon = apiResponse.data.results;
    res.render('index', { 
      pokemon: pokemon.slice(0, 151),
      pokeID: 0
    });
  })
});

// GET / - router for pokemon detail page
router.get('/pokemon/:id', function(req, res) {
  axios.all([
    axios.get(BASE_POKE_URL + req.params.id),
    axios.get(BASE_SPECIES_URL + req.params.id)
  ])
  .then(axios.spread(function (deetsRes, speciesRes) {
    res.render('details', {
      deets: deetsRes.data,
      species: speciesRes.data
    })
  }))
})

// GET / - router for pokemon favorites page
router.get('/favorites', function(req, res){
  db.usr.findAll()
  .then(function(favRes){
    res.render('favs', { usrs: favRes })
  })
})

// PUT / - router for pokemon favorites page
router.post('/favorites', function(req, res) {
  // res.send(req.body)
  db.usr.findOrCreate({
    where: {
      img: req.body.img
    },
    defaults: {
      name: req.body.name
    }
  }).then(function(){
    res.redirect('/favorites')
  })
})

// DELETE / - router for pokemon favorites page
router.delete('/favorites/:id', function(req, res) {
  db.usr.destroy({
    where: {
        name: req.params.id
    }
  }).then(function(){
    res.redirect('/favorites')
  })
})

module.exports = router;

