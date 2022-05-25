const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios')

const controller =  require('../controllers')
// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  const pokemonFromDb = db.pokemon.find()
  console.log(pokemonFromDb)
  const context = {
    pokemon: pokemonFromDb,
    title: "Favorite Pokemon"
  }
  res.render("pokemon/index.ejs", context)
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  // find or  create to avoid doubling pokemons
  const favePokemon = await db.pokemon.findOrCreate({
    where: {
    name: req.body.name
    }
  })
  res.redirect('/pokemon')
});

module.exports = router;
