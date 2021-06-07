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
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  })
    .then (poke => {
      res.redirect('/pokemon')
    })
});

// GET /pokemon - return a page with favorited Pokemon
router.get('/:name', (req, res) => {
  // TODO: Get all records from the DB and render to view
  let pokeData = req.params.name
  let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/'
  // Use request to call the API
  axios.get(`${pokemonUrl}${pokeData}`)
  .then(apiResponse => {
    let pokemon = apiResponse.data;
    res.render('pokemon/show.ejs', {pokemon: pokemon})
  })
});

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