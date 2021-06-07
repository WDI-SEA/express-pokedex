const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios'); 

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
// TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
    .then(pokemons => {
      res.render('pokemon/index.ejs', { pokemons: pokemons})
      })
    .catch(err => {
      log(err)
    })
})
  

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create({
    name: req.body.name
  }).then(poke => {
    console.log('Created: ', poke.name)
    res.redirect('/pokemon')
  })
  .catch(err => {
    log(err)
  })
});

// GET /pokemon - return a page with favorited Pokemon
router.get('/:name', (req, res) => {
  // TODO: renders a show page with information about the Pokemon.
  const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon'
  const pokeData = req.params.name
  // Use request to call the API
  axios.get(`${pokemonUrl}/${pokeData}`).then(apiResponse => {
    let pokemon = apiResponse.data
     res.render('pokemon/show.ejs', {pokemon: pokemon})
  })
  
})

//DELETE
router.delete('/:name', (req, res) => {
  let pokeData = req.params.name
  db.pokemon.destroy({
    where: {
      name: pokeData
    }
  })
  .then(response => {
    res.redirect('/pokemon')
  })
  
})
 
module.exports = router;
