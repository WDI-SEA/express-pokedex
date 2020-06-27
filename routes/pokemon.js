var express = require('express');
const db = require('../models');
const { default: Axios } = require('axios');
var router = express.Router();

router.get('/', function(req, res) {
  db.pokemon.findAll().then((pokemonAll) => {
    res.render('show', {
      pokemon: pokemonAll
    });
  }) 
  
});

router.get('/:name', function(req, res) {
  var pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${(req.params.name).toLowerCase()}`;
  // Use request to call the API
  Axios.get(pokemonUrl).then( function(apiResponse) {
    var pokemon = apiResponse.data;
    res.render ('show2', { pokemon });
  })
});



// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create({
      name: req.body.name
  })
  .then((pokemon) => {
    res.redirect('/')
  }).catch(error => {
    console.log(error)
  })
  
});

module.exports = router;
