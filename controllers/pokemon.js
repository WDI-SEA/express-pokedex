const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios'); 

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  const findPokemon = db.pokemon.findAll()
  .then(pocketMonster => {
    res.render('pokemon', {
      pocketMonster
    })
  })
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB 
  const addPokemon = db.pokemon.findOrCreate({
    where: req.body
  })
   .then(res.redirect('/pokemon'))
});

// GET /pokemon/:name renders a show page with Pokemon information
router.get('/:name', async (req, res) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${req.params.name}/`
  axios.get(url)
    .then(response => {
      res.render('detail.ejs', {
        pokemon: response.data,
        officialArt: response.data.sprites.other['official-artwork'].front_default
      })
    })
    .catch(error => {
      console.log(error)
    })
})

module.exports = router;