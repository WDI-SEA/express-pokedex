var express = require('express');
var db = require('../models')
const axios = require('axios'); 
var router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  //Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(pokemons => {
    res.render('favorite', {pokemon: pokemons})
  }).catch(error => {
    console.log(error)
  })
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  //Get form data and add a new record to DB
  db.pokemon.findOrCreate({ 
    where: { name: req.body.name}
  }).then(([pokemon, created]) => {
    console.log('created', pokemon, created)
    res.redirect('/pokemon')  
  }).catch(error => {
    console.log(error)
  })
});

router.get('/:name', (req, res) => {
  // get info from api through specific pokemon id
  var pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${req.params.name}/`;
  axios.get(pokemonUrl)
  .then(apiResponse => {
    let pokemon = apiResponse.data;
    res.render('show', {pokemon: pokemon})
    //console.log(pokemon)
  }).catch(error => {
    console.log(error)
  })
})


module.exports = router;
