const express = require('express');
let db = require('../models')
const router = express.Router();
const axios = require('axios'); 

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  try {
    const pokemons = await db.pokemon.findAll();

    res.render('pokemon/index', {
      pokemons: pokemons,
      details: false
    })
  } catch (error) {
    console.log(error)
  }
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create({
    name: req.body.name,
  })
  .then(pokemon => {
    console.log(pokemon)
    res.redirect('/pokemon')
  })
  .catch((error) => {
    console.log(error)
  })
});

//GET / pokemon/:name show details about selected pokemon
router.get('/:name', async (req, res) => {
  const pokeDetails = `https://pokeapi.co/api/v2/pokemon/${req.params.name}`

  try {
    const pokemons = await db.pokemon.findAll()
    const apiResponse = await axios.get(pokeDetails)

    res.render('pokemon/index', {
      details: apiResponse.data,
      pokemons: pokemons
    })
  } catch (error) {
    console.log(error)
  }

})

module.exports = router;
