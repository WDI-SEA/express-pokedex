const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const db = require('../models');

// GET /pokemon - return a page with favorite Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  try {
    const allFaves = await db.pokemon.findAll()
    res.render('favorites.ejs', {pokemon: allFaves})
  } catch (err) {
    console.log(err)
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
  } catch (error) {
    console.log(error)
  }
});



router.get('/:name', async (req, res) => {
  try {
    const response = await axios.get(`http://pokeapi.co/api/v2/pokemon/${req.params.name}`)
    res.render('show.ejs', {pokemonDetail: response.data})
    // console.log(response)
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;
