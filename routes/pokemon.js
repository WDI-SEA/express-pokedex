const express = require('express');
const router = express.Router();
const axios = require('axios');
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

// //Build router for pokemon detail page
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

module.exports = router;

