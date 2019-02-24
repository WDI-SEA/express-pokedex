var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');
var methodOverride = require('method-override');


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(pokemon){
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
router.get('/:id', function(req,res) {
  db.pokemon.findById(req.params.id).then(function(pokemon) {
  let name = pokemon.name;
  let url = 'http://pokeapi.co/api/v2/pokemon/' + name + '/';
  console.log(name);
  request(url, function (error, response, body) {
    let image = JSON.parse(body).sprites.front_default;
    let weight = JSON.parse(body).weight;
    let height = JSON.parse(body).height;
    let moves = JSON.parse(body).moves;
    let abilities = JSON.parse(body).abilities;
  res.render('show', {name, image, weight, height, moves, abilities} );
  });
  });
});

// DELETE ONE
router.delete('/:id', function(req, res) {
  db.pokemon.destroy({
    where: {id: req.params.id}
  }).then(function() {
    res.redirect('/pokemon');
  })
})

module.exports = router;
