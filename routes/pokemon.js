var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(pokemon){
    // res.send('FAVORITES');
    res.render('favorites', {pokemon});
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create({
    name: req.body.name
  }).then(function(pokemon){
    res.redirect('pokemon');
  })
});


// GET ONE
router.get('/:id', function(req, res){
  let name = req.params.id;
  let url = 'http://pokeapi.co/api/v2/pokemon/' + name + '/';
  console.log(name);
  request(url, function(error, response, body) {
    let name = JSON.parse(body).name;
    let image = JSON.parse(body).sprites.front_default;
    let weight = JSON.parse(body).weight;
    let height = JSON.parse(body).height;
    let moves = JSON.parse(body).moves;
    let abilities = JSON.parse(body).abilities;
    db.pokemon.findById(parseInt(req.params.id)).then(function(pokemon) {
      res.render('show', {pokemon, name, image, weight, height, moves, abilities});
  })
  });
});


module.exports = router;
