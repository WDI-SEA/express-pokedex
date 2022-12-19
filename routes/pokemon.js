const { application } = require('express');
const express = require('express');
const db = require('../models');
const axios = require('axios'); 
const router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  try {
    const allPokemon = await db.pokemon.findAll()
    res.render('favorites.ejs', {
      allFaves: allPokemon
    })
  } catch(err) {
    console.log(err)
    res.status(500).send('api error')
  }
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  try {
    const returnPokemon = await db.pokemon.findOrCreate({
      where: {
        name: req.body.name
      },
      defaults: {
        name: req.body.name
      }
    })
    res.redirect('/')
  } catch(err) {
    console.log(err)
    res.status(500).send('api error')
  }
})

router.get('/:name', async (req, res) => {
  try {
    const url = `http://pokeapi.co/api/v2/pokemon/${req.params.name}/`
    const response = await axios.get(url)
    // res.json(response.data)
    res.render('show.ejs', {
      pokemon: response.data
    })
  } catch(err) {
    console.log(err)
    res.status(500).send('api error')
  }
})

module.exports = router;
