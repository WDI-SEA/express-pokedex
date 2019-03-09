var express = require('express');
var router = express.Router();
const request = require('request');


// GET /pokemon - return a page with all pokemon
router.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=151';
  // Use request to call the API
  request(pokemonUrl, (error, response, body) => {
    var pokemon = JSON.parse(body).results;
    res.render('pokemon/index', { pokemon: pokemon });
  });
});

// GET /pokemon/:name - return a page with detailed info of one pokemon 
router.get('/:name', function(req, res) {
  request(`https://pokeapi.co/api/v2/pokemon/${req.params.name.toLowerCase()}/`, (error, response, body) => {
    if (error) {
      console.log(`Error: ${error}`);
      res.render('error');
    }
    const pokemon = JSON.parse(body);
    res.render('pokemon/show', { pokemon: pokemon , back: req.query.back });
  })
});

module.exports = router;
