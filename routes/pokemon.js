var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // // TODO: render favorites
    // res.send('Render a page of favorites here');
  db.pokemon.findAll().then(function(data){
    res.render('favorites', {pokemon: data});
  });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // // TODO: add to database
    // res.send(req.body.name);
    // console.log(req.body);
    db.pokemon.create({
      name: req.body.name,
      height: req.body.height,
      weight: req.body.weight,
      base_experience: req.body.base_experience
    }).then(function(data) {
      res.redirect('/');
    })
});


router.get('/:name', function(req, res) {
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + req.params.name + '/';
    console.log(pokemonUrl);
    request(pokemonUrl, function(error, response, body) {
        var pokemon = JSON.parse(body);
        console.log(pokemon);
        res.render('stats', { pokemon: pokemon });
    });
});

module.exports = router;
