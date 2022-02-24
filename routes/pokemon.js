const { default: axios } = require('axios');
const express = require('express');
const db = require('../models');
const router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  try {
    const allFaves = await db.pokemon.findAll()
    res.render('pokemon/index.ejs', {pokemon: allFaves})
  } catch (error) {
    console.log(error)
  }
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  try {
    await db.pokemon.create ({
      name: req.body.name
    })

    res.redirect('/pokemon')
  } catch (error) {
    console.log(error)
  }
});


// SHOW 
router.get('/:name', async (req, res) => {
  try {
    const response = await axios.get(`http://pokeapi.co/api/v2/pokemon/${req.params.name}`)
    const pokeDetails = response.data
    res.render('pokemon/show.ejs', {details: pokeDetails})
    // console.log(response.data)
  } catch (error) {
    console.log(error)
  }
})


module.exports = router;
