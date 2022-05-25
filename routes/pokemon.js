const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async(req, res) => {
  // TODO: Get all records from the DB and render to view
  const allFaves = await db.pokemon.findAll()
  res.render('pokemon/index.ejs', {allFaves})
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  await db.pokemon.create({
    name: req.body.name
  })
  res.redirect('/pokemon')
});

router.get('/:name', (req, res)=>{
  console.log(req.params.name)
  axios.get(`http://pokeapi.co/api/v2/pokemon/${req.params.name}`)
    .then(response =>{
      res.render('pokemon/show.ejs', {
        name: response.data.name,
        img_url: response.data.sprites.front_default,
        abilities: response.data.abilities,
        moves: response.data.moves, 
        stats: response.data.stats
      })
      // console.log(response.data.stats)
    })
    .catch(console.log)
})

module.exports = router;
