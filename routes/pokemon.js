//this is just like index.js, but for all the '/pokemon routes'
var express = require('express');
var router = express.Router();//this is just configures my routes
var db = require('../models');
var request = require('request');


router.get('/', function(req, res) {
     db.pokemon.findAll().then(function(result) {
             res.render('favPokemon', { result: result });
         }).catch(function(error) {
             res.send('There is some kind of error!');
         });
 });


router.get('/', function(req, res) {
     db.pokemon.findAll().then(function(pokemon) {
         res.render('index', { pokemon: pokemon });
     });
 });

//getting name and abilities
router.get('/:name', function(req, res) {
     var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + req.params.name;
     request(pokemonUrl, function(error, response, body) {
         var info = JSON.parse(body);
          info.typesCommaSeperated = info.types.map(function(type) {
              return type.type.name;
          }).join(", ");
          info.abilitiesCommaSeperated = info.abilities.map(function(ability) {
          return ability.ability.name;
          }).join(", ");
          res.render('pokemonInfo', { pokemon: info });
      });
  });

//posting pokemon to add to db
router.post('/', function(req, res) {
       db.pokemon.create({
           name: req.body.name
       }).then(function() {
           res.redirect('/pokemon');
       });
   });

//this is where i'm exporting my '/pokemon' routes to index.js
module.exports = router;
