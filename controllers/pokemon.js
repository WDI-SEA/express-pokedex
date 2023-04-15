const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  let allFavePokemon = await db.pokemon.findAll()

  res.render('pokemon/index', {
    pokemon: allFavePokemon
  })
});

router.get('/:name', async (req, res) => {
  axios.get(`https://pokeapi.co/api/v2/pokemon?offset=151&limit=151/${req.params.name}`).then(apiResponse => {
    let pokemon =apiResponse.data
    res.render('pokemon/show', {
      pokemon: pokemon
    })
  })
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  let newPokemon = await db.pokemon.create({name: req.body.name})
  console.log(myPokemon)
  res.redirect('/pokemon')
  // TODO: Get form data and add a new record to DB
  res.send(req.body);
});

module.exports = router;