var express = require('express');
var router = express.Router();
var db = require('../models');
const axios = require('axios'); 


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(function(poke) {
    res.render('pokemon/index', {pokemon: poke});
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  }).then(function() {
    res.redirect('/pokemon');
  })
});

// in the route path, we could do anything for it :id or anything else
// router.get('/:name', function(req, res) {
//   //req.params.name is the parameter that you're passing through to the API call
//   db.pokemon.findOne({
//     where: {
//       name: req.params.name
//     }
//   }).then(function(pokemon){
//     var pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${(req.params.name)}.toLowerCase()}`;
//     axios.get(pokemonUrl).then(function(apiResponse) {
//       pokemon = apiResponse.data;
//       console.log(pokemon);
//       res.render('pokemon/show', {pokemon});
//     })
//   }).catch(function(error) {
//     console.log('💩💩💩💩💩💩💩💩💩💩');
//     console.log(error);
//   })
// })

router.get('/:name', (req, res) => {
  var pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${(req.params.name).toLowerCase()}`;
  // Use request to call the API
  axios.get(pokemonUrl).then(function(apiResponse) {
    var pokemon = apiResponse.data;
    res.render('pokemon/show', {pokemon})
  })
})

module.exports = router;
