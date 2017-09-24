//this is just like index.js but for all the pokemon routes
var express = require('express');
var request = require('request');
var router = express.Router(); //this just configures my routes
var db = require('../models');


var saveToDb = function(nameofPokemon){
  db.pokemon.findOrCreate({
    where: {
      name: nameofPokemon
    }
  }).spread(function(data, created){
    console.log('Find or create new Pokemon');
  });
};

var trimPokemonObject = function(pokemon) {
  var result = {
    name: pokemon.forms[0].name,
    types: [],
    abilities: [],
    sprite: pokemon.sprites.front_default
  }
  for (var i = 0; i < pokemon.types.length; i++) {
    result.types.push(pokemon.types[i].type.name)
  }
  for (var i = 0; i < pokemon.abilities.length; i++) {
    result.abilities.push(pokemon.abilities[i].ability.name)
  }
  return result;
};


// GET - return a page with favorited Pokemon
router.get('/mypokedex', function(req, res) {
  db.pokemon.findAll().then(function(myPokemon) {
    res.render('favorites', {myPokemon: myPokemon});
  });
});


router.get('/mypokedex/:name', function(req,res) {
  var pokemonName = req.params.name;

  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + pokemonName;
  request(pokemonUrl, function(error, response, body) {
      var pokemonData = JSON.parse(body);
      var pokemon = trimPokemonObject(pokemonData);
      console.log(pokemon);
      res.render('show', {pokemon: pokemon});
  });
});


// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    var myNewPokemon = req.body.name;
    saveToDb(myNewPokemon);
    res.redirect('/pokemon/mypokedex');
});



module.exports = router; //this is where routes are exported
