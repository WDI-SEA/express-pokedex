const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const db = require('../models')
// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  const myPokemon = await db.pokemon.findAll()
  res.render('pokemon.ejs', {myPokemon});
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  await db.pokemon.create(req.body)
  res.redirect('/pokemon')
});

router.get('/:name', (req, res) => {
  axios.get(`http://pokeapi.co/api/v2/pokemon/${req.params.name}`)
    .then(response => {
      console.log(response)
    })
})

module.exports = router;
