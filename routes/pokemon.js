var express = require('express');
var router = express.Router();
var db = require('../models');
const axios = require('axios'); 

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(function(foundPokemons){
    res.render('favorites', { pokemon: foundPokemons });
  }).catch(function(err){
    console.log('error', err);
    res.render('error');
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  })
  .spread(function(poke, wasCreated){
    res.redirect('/pokemon');
  })
  .catch(function(err){
    console.log('error', err);
    res.render('error');
  });
});

// GET /pokemon/3
router.get('/:name', function(req, res){
  console.log("We hit the route");
  if(req.params && req.params.name){
    console.log('We got route perams defined ! ')
    axios.get('https://pokeapi.co/api/v2/pokemon/' + req.params.name)
    .then(function(apiResponse) {
        console.log('We got the data ! ', apiResponse)
        res.render('show', { pokedata: apiResponse.data });
      
    });
  }
  else {
    res.render('error');
  }
});





module.exports = router;


