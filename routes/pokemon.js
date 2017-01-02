var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(pokemons){
    res.render('favorites',{pokemons:pokemons});
  });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create(req.body).then(function(){
    res.redirect('/pokemon');
  });
});

// GET - to individual pokemon
router.get('/:name', function(req, res) {
  var name = req.params.name;
  console.log(name);
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + name;
  console.log(pokemonUrl);
  request(pokemonUrl, function(error, response, body) {
    var moves = JSON.parse(body).moves;
    var sprites = JSON.parse(body).sprites;
    var stats = JSON.parse(body).stats;
    var height = JSON.parse(body).height * 10;
    var weight = JSON.parse(body).weight / 10;
    res.render('singlepokemon', {
      pokemon:name,
      moves:moves,
      sprites:sprites,
      stats:stats,
      height:height,
      weight:weight
    });
  });
});

// DELETE - delete the individual pokemon
router.delete('/:id', function(req,res){
  var id = req.params.id;
  console.log(id);

  db.pokemon.findById(id).then(function(pokemon){
    pokemon.destroy();
    res.send('success deleting pokemon with id: '+id);
  });
});

module.exports = router;
