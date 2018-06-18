var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

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

// GET /pokemon/:id - return a page for a specific Pokemon with details about the Pokemon
router.get('/:id', function(req, res) {
  console.log(req.body.name);
  var pokeId = parseInt(req.params.id);
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + req.body.name;
  // TODO: Get details about specific Pokemon
  request(pokemonUrl, function (error, response, body) {
    var pokemon = JSON.parse(body).results;
    console.log(pokemonUrl);
    // res.render('favorites/show', { pokemon: pokemon });
  });
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

// DELETE
router.delete('/:id', function(req, res) {
  var pokeId = parseInt(req.params.id);
  db.pokemon.destroy({
    where: {id: pokeId}
  }).then(function(data){
    console.log(data);
    res.sendStatus(200);
    res.render('favorites/index')
  });
});


module.exports = router;
