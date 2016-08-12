var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

var router = express.Router();
var db = require('../models');
//app.use(bodyParser.urlencoded({ extended: false }));

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  //res.send('Render a page of favorites here');
  db.pokemon.findAll({}).then(function(pokemon){
    res.render('favorites', {pokemon: pokemon});
  });
  //res.render('favorites');
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  //res.send(req.body);
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  }).spread(function(pokeman, created){
    db.pokemon.findAll({}).then(function(pokemon){
      res.render('favorites', {pokemon: pokemon});
    });     
  });
});

router.get('/:name', function(req, res){
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + req.params.name;
  //console.log(pokemonUrl);

  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body);
    res.render('pokemon/show', { pokemon: pokemon });
  });

});


module.exports = router;
