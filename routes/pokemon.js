const express = require('express')
const router = express.Router()
const path = require('path')
const db = require(path.join(__dirname, '../models'))
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  const allPokemon = await db.pokemon.findAll()
  console.log(allPokemon)
  res.render('pokemon/index.ejs', {
    pokemon: allPokemon
  })
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  await db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  })
  res.redirect('/pokemon')
})

router.get('/:name', async (req, res) => {
  // Use request to call the API
  try {
    const pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${req.params.name}`
    const response = await axios.get(pokemonUrl)
    console.log(response.data)
    res.render('pokemon/show.ejs', {
      pokemon: response.data,
      name: req.params.name
    })
    // res.json(response.data)
  } catch (err) {
    console.log('🤬🤬🤬🤬🤬', err)
    res.status(500).send('api error 🤬')
  }
})

module.exports = router
