const express = require('express');
const router = express.Router();
const axious = require('axios');
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  const allFaves = await db.pokemon.findAll()
  // TODO: Get all records from the DB and render to view
  res.render('/pokemon/index.ejs', {allFaves}) 
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  await db.pokemon.crate({
    name: req.body.name
  })
  // TODO: Get form data and add a new record to DB
  res.redirect('/pokemon')
});

router.get('/:name', (req, res) => {
  console.log(req.params.name)
  axios.get(`http://pokeapi.co/api/v2/pokemon/${req.params.name}`)
    .then(response =>{
      res.render('pokemon/show.ejs', {
        name: response.data.name,
        stats: response.data.stats,
        abilities: response.data.abilities,
        moves: response.data.moves,
        img_url: response.data.sprites.front_default 
      })
    })

  })

module.exports = router;
