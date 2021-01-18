const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  db.pokemon.findAll()
  .then(dbPokemons => {
    res.render('pokemon.ejs', {dbPokemons})
  }).catch(error => {
    console.log(error)
  })
})


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: { 
      name: req.body.name
    }
  })
  .then((pokemon) => {
    res.redirect('/pokemon');
  })
});

// Get /:id for each favorite monsters
router.get('/:name', (req, res) => {
  axios.get(`http://pokeapi.co/api/v2/pokemon/${req.params.name}`)
  .then(foundMonster => {
    res.render('details', { pokemon: foundMonster.data })
    // console.log(foundMonster.data)
  })
})

module.exports = router;
