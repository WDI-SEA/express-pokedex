const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  // res.send('Render a page of favorites here');
  try {
    const dispAllPokemon = await db.pokemon.findAll()
    res.json(dispAllPokemon)
  } catch (error) {
    console.log(error)
  }
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  // res.send(req.body);
  try {
    await db.pokemon.create({
      name: req.body.name
    })
    res.redirect('/pokemon')
  } catch (error) {
    console.log(error)
  }
});

//display more info about the pokemon
router.get('/:name', async (req, res) => {
  try {
    const response = await axios.get(`http://pokeapi.co/api/v2/pokemon/${req.params.name}/`)
    res.render('show.ejs', { pokemon: response.data })
  } catch (error) {
    console.log(error)
  }
})
module.exports = router;
