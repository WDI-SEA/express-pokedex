var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
db.pokemon.findAll().then(function(data) {
res.render('faves', { pokemon: data });
});
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  var pokeName = req.body.name;
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + pokeName;
  var image = null;
  request(pokemonUrl, function(error, response, body) {
    var results = JSON.parse(body);
    image = results.sprites.front_default;
    console.log(image + 'the image is now this');
    db.pokemon.create({
      name: pokeName,
      img: image,
  }).then(function(data) {
  res.redirect('/pokemon');
});
});
});

// DELETE!!!!>

router.delete('/:index', function(req, res) {
    db.pokemon.destroy({
      where: {id: req.params.index }
    })
    .then(function(data) {
      res.sendStatus(200);
  });
});

// SHOW THAT POKEMON

router.get('/:index', function(req, res) {
  var index = parseInt(req.params.index);
  var thatPokemon = {};
  db.pokemon.find({
     where: { id: index }
     }).then(function(data) {
        var pokeName = data.name;
        console.log(data.name);
        var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + pokeName;
        request(pokemonUrl, function(error, response, body) {
          var results = JSON.parse(body);
          thatPokemon.name = results.name.toUpperCase();
          thatPokemon.id = results.id;
          thatPokemon.type = results.types[0].type.name;
          thatPokemon.weight = (results.weight / 10) + 'kg';
          thatPokemon.height = (results.height / 10) + 'm';
          thatPokemon.img = results.sprites.front_default;
          res.render('show', { pokemon: thatPokemon });
        });
        });
 //
 //
 //    } else {
 //      res.send('nah dogg');
 //    }
 // });
});

module.exports = router;
