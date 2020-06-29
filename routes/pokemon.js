var express = require('express');
var router = express.Router();
var db = require('../models')
var axios = require('axios'); 

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()

  .then(pokemons => {
    res.render('favorites', {pokemons})
  }).catch(err => console.log(err))
});

router.get('/:id', (req, res) => {
  let idQuery = req.params.id;
  let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + idQuery;
  let locationUrl = 'http://pokeapi.co/api/v2/pokemon/' + idQuery + '/encounters';
  let pokemon;
  let cities = []
  axios.get(pokemonUrl)
  .then( function(apiResponse) {
    pokemon = apiResponse.data;
  
    axios.get(locationUrl)
    .then( function(response) {

      response.data.forEach(function(element) {
        let originalName = element.location_area.name
        let newName = originalName.replace(/-/g, ' ')
        cities.push(newName)
      })

      res.render('show', { 
        pokemon: pokemon,
        backImg: pokemon.sprites.back_default,
        frontImg: pokemon.sprites.front_default,
        types: pokemon.types,
        found: cities
      })
    })
  })
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {
        name: req.body.name,
    }
}).then(([pokemon, created]) => {
    res.redirect('/pokemon')
  })
});

module.exports = router;
