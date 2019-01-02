var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(function(foundPokemons){
    res.render('favorites', { pokemon: foundPokemons });
  }).catch(function(err){
    console.log('error', err);
    res.render('error');
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  })
  .spread(function(poke, wasCreated){
    res.redirect('/pokemon');
  })
  .catch(function(err){
    console.log('error', err);
    res.render('error');
  });
});

// GET /pokemon/3
router.get('/:name', function(req, res){
  if(req.params && req.params.name){
    request('https://pokeapi.co/api/v2/pokemon/' + req.params.name, function(error, response, body){
      if(error || response.statusCode != 200){
        res.render('error');
      }
      else {
        var pokedata = JSON.parse(body);
        res.render('show', { pokedata: pokedata });
      }
    });
  }
  else {
    res.render('error');
  }
});

module.exports = router;
