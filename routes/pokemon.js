var express = require('express');
var router = express.Router();
var db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(function(data) {
    res.render('favorites/index', {pokemon: data});
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create({
    name: req.body.name
  }).then(function(data) {
    res.redirect('/pokemon');
  }) 
});

// GET /pokemon/:id - return a page for a specific Pokemon
router.get('/:id', function(req, res) {
  var pokeId = parseInt(req.params.id);
  // var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/ability/';
  // TODO: Get one record from the DB and render to view
  db.pokemon.find({
    where: {id: pokeId}
  }).then(function(data) {
    if (data != null) {
      res.render('favorites/show', {pokemon: data});
    } else {
      res.render('404');
    }
  });
});

// GET pokemon abilities from api
// router.get('/', function (req, res) {
//   var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/ability/{id or name}';
//   // Use request to call the API
//   request(pokemonUrl, function (error, response, body) {
//     var pokemon = JSON.parse(body).results;
//     res.render('favorites/show', { pokemon: pokemon });
//   });
// });

// DELETE
router.delete('/:id', function(req, res) {
  var pokeId = parseInt(req.params.id);
  db.pokemon.destroy({
    where: {id: pokeId}
  }).then(function(data){
    res.sendStatus(200);
    res.render('favorites/index')
  });
});


module.exports = router;
