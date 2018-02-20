var db = require('../models');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var router = express.Router();

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(data) {
    console.log(data);
    res.render('favorites', {pokemon: data});
  });
});



router.get('/:id', function(req, res) {
  db.pokemon.find({
    where: {id: req.params.id}
  }).then(function(data) {
    var pokename = data.name;
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/'+ pokename;
    console.log(pokemonUrl)
    request(pokemonUrl, function(error, response, body) {
        var pokemon = JSON.parse(body);
        console.log(pokemon);
        res.render('show', {pokemon: pokemon});
      });
    });
  });

  // router.get('/:name', function(req, res) {
  //   db.pokemon.find({
  //     where: {name: req.params.name}
  //   }).then(function(data) {
  //     var pokename = data.name;
  //     var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/'+ pokename;
  //     console.log(pokemonUrl)
  //     request(pokemonUrl, function(error, response, body) {
  //         var pokemon = JSON.parse(body);
  //         console.log(pokemon);
  //         res.render('show', {pokemon: pokemon});
  //       });
  //     });
  //   });



router.delete('/:name', function(req, res) {
  db.pokemon.destroy({
    where : {name: req.params.name}
  }).then(function(data) {
    console.log('DELETED ENTRY');
    res.send('DELETED');
  });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.findOrCreate({
    where: {name: req.body.name}
  }).then(function(data) {
    console.log(data);
    res.redirect('/pokemon');
  });
});

module.exports = router;
