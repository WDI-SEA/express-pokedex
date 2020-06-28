var express = require('express');
const axios = require('axios'); 
var router = express.Router();
var db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(pokemon => {
    res.render('index', {pokemon: pokemon})
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name,
    }
  }).then(function() {
    res.redirect('/pokemon')
  })
});

router.get('/:name', (req, res) => {
    var pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${(req.params.name).toLowerCase()}`;
    // Use request to call the API
    axios.get(pokemonUrl).then( function(apiResponse) {
      var pokemon = apiResponse.data;
      res.render('show', {pokemon})
    })
})

module.exports = router;
