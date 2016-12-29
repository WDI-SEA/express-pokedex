var express = require('express');
var router = express.Router();

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  console.log(req.body);
  res.render('favorites');
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  console.log(req.body);
  res.render('favorites');
});

//GET - to individual pokemon
router.get('/:id', function(req, res) {
  id = req.params.id;
  console.log(id);
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/<-% id %>/';
  console.log(pokemonUrl);

  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    res.render('singlepokemon', { pokemon: pokemon });
  });
});

module.exports = router;
