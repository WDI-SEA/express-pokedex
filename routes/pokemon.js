var express = require('express');
var router = express.Router();
var db = require('../models');
var axios = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemons.findAll().then(function(pokemon) {
  res.render('pokemon/index', { pokemons: pokemon });
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
 db.pokemons.create({
   name: req.body.name,
   nickname: null,
   type: null
 }).then(function() {
   res.redirect('/pokemon');
  });
});

// GET /pokemon/:id
router.get('/:id', function(req, res) {


//qeury model for pokemon with given ID in faves DB
var num = req.params.id;
db.pokemons.findOne({
  where: {
    id: num
  }
}).then(function(pokemon) {
  var pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
  axios.get(pokemonURL)
  .then(function(result) {
    var pokeInfo = result.data;
    res.render('pokemon/show', { pokemon: pokeInfo })
  })
  .catch(function(err) {console.log(err);  })
  .finally(function() {
    console.log("made it to the end")
  })
})

});

module.exports = router;
