const { default: axios } = require('axios');
const express = require('express');
const db = require('../models');
const router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  const pokeBowl = await db.pokemon.findAll()
  res.render('pokemon/index.ejs', { pokeBowl })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  await db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    },
    defaults: {
      name: req.body.name
    }
  })
  res.redirect('/pokemon')
});

// GET details
router.get('/:name', (req, res) => {
  const poke = req.params.name
  const bowlDeets = `http://pokeapi.co/api/v2/pokemon/${poke}`
  axios.get(bowlDeets)
    .then(response => {
      const pokemon = response.data;
      res.render('pokemon/show.ejs', {
        name: poke,
        pokemon: pokemon
      })
    })
})

router.delete('/:name', async (req, res) => {
  try{
    const poke = req.params.name
    const noMoPoke = await db.pokemon.findOne({
      where: {
        name: poke
      }
    })
    await noMoPoke.destroy()
    res.redirect('/pokemon')
  } catch {
    console.log('FIRE', err)
  }
})

module.exports = router;
