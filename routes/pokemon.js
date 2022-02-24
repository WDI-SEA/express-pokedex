const express = require('express');
const router = express.Router();
const axios = require('axios'); 
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  try {
    const favePokemon = await db.pokemon.findAll()
    res.json(favePokemon)
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
  } catch (err) {
    console.log(err)
  }
});

router.get('/:name', async (req, res) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.name}/`)
    res.render('details.ejs', { details: response.data})
  } catch (err) {
    console.log(err)
  }
})


module.exports = router;
