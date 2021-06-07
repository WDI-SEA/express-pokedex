const express = require('express')
const router = express.Router()
const db = require('../models')
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  db.pokemon.findAll()
    .then(pokemons => {
      console.log(pokemons)
      res.render('pokemon/index', { pokemons })
    })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  }).then(pokemon => {
    res.redirect('/pokemon')
  })
});

// GET /pokemon/:name renders a shwo page with information about that pokemon
router.get('/:name', (req,res) => {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.name}`)
    .then(apiResponse => {
      console.log(apiResponse.data)
      res.render('pokemon/show', { pokemon: apiResponse.data})
    })
})

module.exports = router;
