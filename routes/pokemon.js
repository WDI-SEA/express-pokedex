var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(data) {
    // change index to a favorites page ejs!!!
    res.render('pokemon/index', {pokemon: data});
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.findOrCreate({
    where: {name: req.body.name}
  }).spread(function (result) {
      if(!result.isNewRecord) {
        console.log('already in favorites');
      }
      res.redirect('/pokemon');
    });
});

// GET /pokemon/:name - get info about specific pokemon and display
router.get('/:name', function(req, res) {
  var name = req.params.name;
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + name;
  // Use request to call the API for specific pokemon
  request(pokemonUrl, function(error, response, body) {
    var pokeInfo = JSON.parse(body);
    // console.log("poke Info is: ", pokeInfo.abilities[1].ability.name);
    res.render('pokemon/show', {pokeInfo: pokeInfo});
  });
});

// DELETE - /pokemon/:id 
router.delete("/:id", function(req, res) {
  db.pokemon.destroy({
    where: {id: req.params.id}
  }).then(function(data) {
    res.sendStatus(200);
  });
});

module.exports = router;
