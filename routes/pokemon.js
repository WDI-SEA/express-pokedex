var express = require('express');
var router = express.Router();
const axios = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/favorites', function(req, res) {
  // TODO: Get all records from the DB and render to view
  res.render('favorites');
});

// GET / - main index of site
router.get('/details/:id', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + req.params.id;
  // Use request to call the API
  axios.get(pokemonUrl).then( function(apiResponse) {
    var pokemon = apiResponse.data;
    console.log("here are the pikachus: ", pokemon)
    res.render('details', { pokemon: pokemon });
  })
});


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  res.send(req.body);
});

module.exports = router;
