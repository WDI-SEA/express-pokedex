const express = require('express');
const router = express.Router();
const axios = require('axios')
const db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  try {
    const allFaves = await db.pokemon.findAll()
    // res.json(allFaves)
    res.render('./pokemon/index.ejs', {
      pokemon: allFaves
    })
  } catch (error) {
    console.log(error)
  }
  // res.send('Render a page of favorites here');
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
  // res.send(req.body);
});

router.get('/:name', async (req, res) => {
  try {
    const response = await axios.get(`http://pokeapi.co/api/v2/pokemon/${req.params.name}`)
    res.render('pokemon/show.ejs', { pokemonDetails: response.data })
    console.log(response)
  } catch (error) {
    console.log(error)
  }
})


module.exports = router;
