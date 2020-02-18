var express = require('express');
var router = express.Router();
const axios = require('axios'); 
const db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(function(pokemons) {
    // res.json(pokemons);
    // console.log(pokemons);
    res.render('favorites', { pokemon:pokemons });
  }).catch(err => {
    console.log(err);
    res.send("Error occured");
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    },
    defaults: {
      url: req.body.url
    }
  }).then(function([pokemon, created]) {
    console.log("added", created);
    res.redirect('/pokemon') 
  }).catch(err => {
      console.log(err);
      res.send("Error occured");
  });

});

// the user can look an individual pokemon by putting their name in the url
router.get('/:id', function(req, res) {
  db.pokemon.findOne({
    where: {
      name: req.params.id
    }
  }).then(function(pokemon) {
    console.log("found this pokemon:", pokemon.name);
    var pokemonUrl = pokemon.url;
    // Use request to call the API
    axios.get(pokemonUrl).then( function(apiResponse) {
      var pokeData = apiResponse.data;
      console.log(pokeData);
      res.render('showOne', {name:pokemon.name, pokemon:pokeData} );
    });
  }).catch(err => {
    console.log(err);
    res.send("Error occured");
  })
});

router.delete('/:id', function(req, res) {
  db.pokemon.destroy({
    where: {
      name: req.params.id
    }
  }).then(function(deletedPoke) {
    console.log("Pokemon deleted from faves");
    res.redirect('/pokemon');
  }).catch(err => console.log(err));
})
module.exports = router;
