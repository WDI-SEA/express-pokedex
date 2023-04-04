const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios'); 

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  let allFavePokemon = await db.pokemon.findAll()
  res.render('pokemon/index', {
    pokemon: allFavePokemon
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  let newPokemon = await db.pokemon.create({
    name: req.body.name
  })
  res.redirect('/pokemon')
  console.log(newPokemon)
});

// GET /pokemon/name - return a page with ingo on a specific pokemon
router.get('/:name', async (req, res) => {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.name}`).then(apiResponse => {
    let pokemon = apiResponse.data
    console.log(pokemon)
    res.render('pokemon/show', {
      pokemon: pokemon,
      officialArt: pokemon.sprites.other["official-artwork"].front_default
    })
  })
})

module.exports = router;