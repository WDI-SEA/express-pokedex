const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
// READ function to find all favorited pokemons
router.get('/', async (req, res) => {
  try {
    // TODO: Get all records from the DB and render to view
    const favPokemon = await db.pokemon.findAll()
    res.render('faves.ejs', {
      favePokemon: favPokemon
    });
  } catch (error) {
    console.log(error)
  }
});

// POST /pokemon - receive the name of a pokemon and add it to the database
// POST is Update
router.post('/', async (req, res) => {
  try {
    const pokemons = await db.pokemon.findOrCreate({
      where: {
        // body not referencing body, think of body as a data
        name: req.body.name
      }
    })
  } catch (error) {
    console.log(error)
  }
  // TODO: Get form data and add a new record to DB
  // figure out reason of params
  res.redirect('/pokemon');
});

router.get('/:name', async (req, res) => {
  try {
    const url = `http://pokeapi.co/api/v2/pokemon/${req.params.name}`
    const response = await axios.get(url)
    res.render('show.ejs', {
      pokemons: response.data,
      name: req.params.name
    })
    console.log(response.data)
  } catch (error) {
    console.log(error)
    res.status(500).send('api error')
  }
})

module.exports = router;
