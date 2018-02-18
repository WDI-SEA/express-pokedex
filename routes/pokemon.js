var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');
// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    db.pokemon.findAll().then(function(pokemon) {
      console.log(pokemon);
      res.render('favorites', {pokemon: pokemon});
    });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  var pokeName = req.body.name;
  //finds out if pokemon already exists in table
  db.pokemon.count({where: {name: pokeName}}).then(function(data) {
    console.log(data);
    //if pokemon exists go into table and find that
    if(data !== 0) {
      db.pokemon.findOne({where: {name: pokeName}}).then(function(data) {
        res.render('show', {pokemon: data.dataValues});
      });
    } else {
      //pokemon doesn't exist in table already, do another api call to store name and image
      var pokemonUrlI = 'http://pokeapi.co/api/v2/pokemon/'+pokeName+'';
      request(pokemonUrlI, function(error, response, body) {
          var pokemonImage = JSON.parse(body).sprites.front_default;
          // JSON.parse(body).results.sprites.front_default.;
          db.pokemon.create({
            name: pokeName,
            image: pokemonImage
          }).then(function(data) {
          res.render('show', {pokemon: data.dataValues});
        });
      });
    }
  });
});

router.delete('/:name/destroy', function(req, res) {
  var pokeToDie = req.params.name;
  db.pokemon.destroy({where: {name: pokeToDie}}).then(function() {
    res.send();
  });
});

module.exports = router;
