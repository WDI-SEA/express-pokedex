// this is just like index.js but for all the 'pokemon routes'
var request = require('request');
var express = require('express');
var router = express.Router();// this just configures my routes
var db = require('../models');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll()
    .then(function(poke) {
      // pokemon will be an array of all POkemon instances
      var pokemon = poke.map( function(pokename) {
        return pokename.dataValues;
      })
      res.render('pokemon', {pokemon:pokemon});
  });
    // TODO: render favorites
});

router.get('/:id', function(req, res) {
  // var abilityUrl = 'http://pokeapi.co/api/v2/ '
  var pokeId= req.params.id
  db.pokemon.find({
    where: {id: pokeId}
  }).then(function(poke) {
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + poke.name;
    console.log(poke.name);
  // get route for our home
    request(pokemonUrl, function(error, response, body) {
        var pokemon = JSON.parse(body);
        console.log(pokemon);
        // this is what we're getting back from the API
        res.render('abilites', { pokemon:pokemon });
        // the 1st pokemon is just a variable declartions
        // second pokemon is the actual data
    });
    //user will be an instance of User and stores the content of the table entry with id 2. if such an entry is not defined you will get null
    // res.render("abilites", {nothing: 'nothing'});
  });
})
// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    var favpokemon =req.body.name;
    db.pokemon.create({
      name: favpokemon
    }).then(function(poke) {
      console.log('created', poke.name);
      res.redirect('pokemon');
  });
});


// res.send
// router.post('/')
/// this exports my pokemon routes to index.js
module.exports = router;
