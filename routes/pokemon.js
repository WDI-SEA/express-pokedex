const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const db = require("../models")

// GET /pokemon - return a page with favorite Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  // access the data from pokemons database
  db.pokemon.findAll()
  .then( pokemon => {
    res.render('favorites', {pokemon:pokemon});

  })
});
router.get('/:name', function(req,res) {
  let pokemonName = req.params.name;
  axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonName}`)
  .then(apiResponse => {
    console.log(apiResponse.data)
    res.render('show', {pokemonData:apiResponse.data})
  })
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  //db.pokemon this is how I access the pokemon model
  console.log(req.body.name)
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name

    }
  }).then(([poke, pokemonCreated]) => {
    console.log('Created: ', pokemonCreated)
    res.redirect('/pokemon');
  })
});

module.exports = router;
