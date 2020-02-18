var express = require('express');
var router = express.Router();
const axios = require('axios'); 



var db = require('../models');

// db.pokemon.create({
//   name: 'Pikachu'
// }).then(function(poke) {
//   console.log('Created: ', poke.name)
// })

// db.pokemon.findAll().then(function(poke) {
//   console.log('Found: ', poke.name)
// })

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(poke) {
  
  // var favorites = db.pokemon.findAll().then(data => { return data })
  //})
  // TODO: Get all records from the DB and render to view
  res.render('favorites', { pokemon: poke });
});
})

// router.get('/:id', function(req, res) {

// })
router.get('/:id', function(req, res) {
  
  var pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`;
  axios.get(pokemonUrl).then( function(apiResponse) {
    res.render('show', { pokemon: apiResponse.data });
  }).catch(err => {
    console.log(err);
    res.send('error');
});
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }  
  }).then(function(poke) {
    console.log('Created: ', poke.name)
    res.redirect('/pokemon');
  }).catch(err => {
    console.log(err);
    res.send('error');
  });
  // TODO: Get form data and add a new record to DB
});

router.post('/remove', function(req, res) {
  db.pokemon.destroy({
    where: {
      name: req.body.name
    }
  }).then(function(poke) {
    //console.log('Created: ', poke.name)
    res.redirect('/pokemon');
  }).catch(err => {
    console.log(err);
    res.send('error');
  });
  // TODO: Get form data and add a new record to DB
});

module.exports = router;
