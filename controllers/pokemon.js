const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  try {
    const allFaves = await db.pokemon.findAll()
    console.log(allFaves)
    res.render('faves.ejs', { allFaves })
  } catch (err) {
    console.log(err)
    res.status(500).send("Server had a 500 error")
  }
  
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  const pokeName = req.body.name
  try {
    await db.pokemon.findOrCreate({
      where: {
        name: pokeName
      }
    })
    res.redirect('/pokemon')

  } catch(err) {
    console.log(err)
    res.send(500).send("Server had an error")
  }
});

// GET /pokemon/:name -- renders a show page with info about the pokemon
router.get('/:name', async (req, res) => {
  const url = `http://pokeapi.co/api/v2/pokemon/${req.params.name}`
  axios.get(url)
  .then(response => {
    res.render('detail.ejs', {
      pokemon: response.data
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).send("Server ist kaput")
  })
})

module.exports = router;