var express = require('express');
var router = express.Router();
var db = require('../models');
var bodyParser = require('body-parser');
var request = require('request');

// GET pokemon on team - 
router.get('/:name', function(req, res) {
  db.pokemon.find({
    where: { name: req.params.name }
  }).then(function(data) {
    request({
      url: 'http://pokeapi.co/api/v2/pokemon/' + data.name
    }, function(error, response, body) {
      var pokemon = JSON.parse(body);
      console.log(pokemon);
      res.render('show', { pokemon: pokemon, name: req.params.name})
    });
  });
});

// GET /pokemon - return a page with your Pokemon team
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(data) {
    console.log(data);
    res.render('team', {pokemon: data});
  });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.findOrCreate({
    where: {name: req.body.name}
  }).then(function(data) {
    console.log(data);
    // res.redirect('/pokemon');
  });
});

// DELETE - "release" the Pokemon from your team
router.delete('/:name', function(req, res) {
  db.pokemon.destroy({
    where : {name: req.params.name}
  }).then(function(data) {
    console.log('You released them!');
    res.send('DELETED');
  });
});

module.exports = router;