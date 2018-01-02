var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var router = express.Router();
var db = require('../models');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    db.pokemon.findAll().then(function(pokemon){
      res.render('favorites', {pokemon: pokemon});
    });
});


// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // Add to database
    db.pokemon.create(req.body).then(function(createdFavorite){
    res.redirect('/pokemon');
    // catch to display any error messages 
    }).catch(function(err){
      res.send('Uh oh!', err);
    });
});

// Delete pokemon from favorites list
router.delete('/:id', function(req, res){
  db.pokemon.destroy({
    where: { id: req.params.id }
  }).then(function(deleted){
  console.log("deleted ", deleted);
  res.send('Success');
  }).catch(function(err){
  console.log("Uh oh error", err);
  res.send('Fail');
  });
});


// GET - see each favorite with additional info
router.get('/:id', function(req, res){
  db.pokemon.findById(req.params.id).then(function(pokemon){
    var favName = pokemon.name
    var pokemonFav = 'http://pokeapi.co/api/v2/pokemon/' + favName + '/';

    request(pokemonFav, function(error, response, body){
      var pokemon = JSON.parse(body);
      res.render('single', {pokemon: pokemon});
    });
  });
});

module.exports = router;
