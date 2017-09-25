//this is just like index.js but for all the pokemon routes
var express = require('express');
var request = require('request');
var router = express.Router(); //this just configures my routes
var db = require('../models');


//SAVE pokemon to db
var saveToDb = function(nameofPokemon){
  db.pokemon.findOrCreate({
    where: {
      name: nameofPokemon
    }
  }).spread(function(data, created){
    console.log('Found or created new Pokemon');
  })
};


//MAKE Pokemon object more manageble
var trimPokemonObject = function(pokemon) {
  var result = {
    name: pokemon.forms[0].name,
    types: [],
    abilities: [],
    sprite: pokemon.sprites.front_default,
    moves: []
  }
  for (var i = 0; i < pokemon.types.length; i++) {
    result.types.push(pokemon.types[i].type.name)
  }
  for (var i = 0; i < pokemon.abilities.length; i++) {
    result.abilities.push(pokemon.abilities[i].ability.name)
  }
  for (var i = 0; i < 3; i++) {
    result.moves.push(pokemon.moves[i].move.name)
  }
  return result;
};


// GET - return a page with favorited Pokemon
router.get('/mypokedex', function(req, res) {
  db.pokemon.findAll().then(function(myPokemon) {
    res.render('favorites', {myPokemon: myPokemon});
  });
});


//GET - info from api to match whats in db
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


//DELETE
router.delete('/mypokedex/delete/:name', function(req, res) {
    db.pokemon.destroy({
      where: {name: req.params.name}
    }).then(function() {
      console.log('Deleted a pokemon');
    });
    res.redirect('/');
  });




module.exports = router; //this is where routes are exported
