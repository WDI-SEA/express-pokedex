var express = require('express');
var router = express.Router();
var db = require('../models')
const axios = require('axios');

const errorHandler = error => {
  console.log('🔥🔥🔥🔥🔥🔥')
  console.log(error)
}

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(function(poke) {
    console.log('Found: ', poke[1].name)
    res.render('pokemon/index', {poke: poke})
  })
  });
// });


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  }).then(([pokemon, created]) => {
    res.redirect('/pokemon')
    console.log(`🐶 ${pokemon.name} was ${created ? 'created👍' : 'found🔎'}`)
    
  }).catch(errorHandler)
});

// GET /pokemon/:id
router.get('/:id', function(req, res) {
  db.pokemon.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(pokemon) {
    axios.get('http://pokeapi.co/api/v2/pokemon/'+pokemon.name.toLowerCase())
    .then(function(response) {
      console.log(response)
      res.render('pokemon/show', {response})
    }).catch(errorHandler)
  }).catch(errorHandler)
})

module.exports = router;
