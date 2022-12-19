const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  try {
    const allFavorites = await db.favorite.findAll()
    res.render('favorites.ejs', {
      allFavorites: allFavorites 
    })
  } catch (err) {
    console.log('🤔🤔🤔🤔🤔🤔🤔', err)
    res.status(500).send('api error 🤔🤔🤔')
  }
});

// GET /pokemon/:name
router.get('/:name', async (req, res) => {
  try {
    const pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${req.params.name}`
    // console.log(pokemonUrl)
    const response = await axios.get(pokemonUrl) 
    res.render('show.ejs', {
      pokemon: response.data
    })
  } catch (err) {
    console.log('🤔🤔🤔🤔🤔🤔🤔', err)
    res.status(500).send('api error 🤔🤔🤔')
  }
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  // res.send('render all fave here please')
  try {
    const favPokemon = await db.favorite.findOrCreate({
      where: {
        name: req.body.name
      },
      defaults: {
        name: req.body.name
      }
    })
    res.redirect('/pokemon')
  } catch (err) {
    console.log('🤔🤔🤔🤔🤔🤔🤔', err)
    res.status(500).send('api error 🤔🤔🤔')
  }
});

module.exports = router;
