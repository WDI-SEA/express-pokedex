var express = require('express');
var router = express.Router();
const request = require('request');
var db = require('../models');
var app = express();


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then( function(pokemon) {
    res.render('favorite', {pokemon})
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create({
    name: req.body.name
  }).then(function() {
    res.redirect('pokemon')
  })
  // TODO: Get form data and add a new record to DB
  
});

// GET ONE POKEMON
// router.get('/:id', function(req, res) {
//   db.pokemon.findById(req.params.id).then( function(pokemon) {
//     // res.json(pokemon)
//     res.render('show', {pokemon})
//   })
// })

router.get('/:name', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + req.params.name;
    request(pokemonUrl, function(error, response, body) {
      var pokemonInfo = JSON.parse(body);
      res.render('show', {pokemon: pokemonInfo});
    });
});

// // UPDATE ONE POKEMON
// router.put('/:id', function(req, res) {
//   db.pokemon.update({
//     name: req.body.name
//   }, { where: {id: req.params.id}}).then( function() {
//     res.redirect('pokemon/' + req.params.id)
//   })
// })

module.exports = router;
