const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  try {
    const allFaves = await db.pokemon.findAll()
    res.render('pokemon/index', {pokemon: allFaves});
  } catch(error) {
    console.log(error)
  }
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  try {
    await db.pokemon.create({
      name: req.body.name
    })
    res.redirect('/pokemon')
  } catch(error) {
    console.log(error)
  }
});

router.get('/:name', async (req,res) => {
  try {
    const response = await axios.get(`http://pokeapi.co/api/v2/pokemon/${req.params.name}/`)
    // console.log(response.data)
    res.render('pokemon/show', {pokemonDetails: response.data})
  } catch(error) {
    console.log(error)
  }
})

module.exports = router;
