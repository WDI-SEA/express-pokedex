const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios'); 


const errorHandler = error => {
  console.log('WARNING: this is an error');
  console.log(error);
}

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(pokemon => {
  // TODO: Get all records from the DB and render to view
  res.render('pokemon/index', {pokemon});
}).catch(errorHandler)
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create({
    name: req.body.name
  }).then(pokemon => {
    console.log(pokemon)
    res.redirect('/pokemon')
  }).catch(errorHandler)
});

//GET /pokemon/:id - display/show more info on each pokemon

router.get('/:name', (req, res) => {
  // db.pokemon.findOne({
  //   where: {
  //     id: req.params.id
  //   }
  // }).then(pokemon => {
  //   console.log('got pokemon from db')
  //   var pokemonData = 'https://pokeapi.co/api/v2/pokemon/' + pokemon.name.toLowerCase()
  //   axios.get(pokemonData).then(response => {
  //     console.log('got data from api')
  //     res.render('pokemon/show', { response: response.data })
  //   }).catch(errorHandler)

  // })
  var pokemonData = 'https://pokeapi.co/api/v2/pokemon/' + req.params.name.toLowerCase()
  axios.get(pokemonData).then(response => {
        console.log('got data from api')
        res.render('pokemon/show', { response: response.data })
      }).catch(errorHandler)
});
module.exports = router;
