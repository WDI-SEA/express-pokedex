//this is just like index.js, but for all the './pokemon' routes


var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

// GET - return a page with favorited Pokemons
router.get('/', function(req, res) {
    //get everything from pockemon db and render favotites page.
    db.pokemon.findAll({
    }).then(function(pokes){
      res.render('favorites', { pokemons: pokes });
    });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // add to database, adding raw to a table

    var pokemonName = req.body.name;
    db.pokemon.findOne({
      where:{
        name: pokemonName
      }
    }).then(function(poke){
      //poke is the result of my query
      if(poke === null){
        db.pokemon.create({
          name: pokemonName
        }).then(function(poke){
          //here poke is what db returned from create
          console.log('created ', poke.name);
          res.redirect('/pokemon');
        });
      }else{
        console.log('already exist: ', poke.name);
        res.redirect('/pokemon');
      }
    });

});


//deleting from favorites
router.delete('/:pokemonName', function(req, res){
  var pokemonToDelete = req.params.pokemonName;
  db.pokemon.destroy({
    where: {
      name: pokemonToDelete
    }
  }).then(function(poke){
    console.log('deleted', pokemonToDelete);
    res.redirect('/pokemon');
  });
});

router.get('/:pokemonName', function(req, res) {
    var pokemonToGet = req.params.pokemonName;

    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/'+ pokemonToGet + '/';
    console.log(pokemonUrl);
    request(pokemonUrl, function(error, response, body) {
        var pokemon = JSON.parse(body);
        res.render('pokemonDetails', { pokemon: pokemon });
    });
});


//this is where I am exporting my pokemon routes
module.exports = router;
