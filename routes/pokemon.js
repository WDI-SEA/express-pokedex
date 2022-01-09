const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  db.pokemon.findAll()
    .then(favorite => {
      console.log(favorite)
      // TODO: Get all records from the DB and render to view
      res.render('favePokemon/index', {results: favorite})
    })
});

// SHOW
router.get('/:name', (req, res) => {
  let pokeDetail = req.params.name
  console.log("this is pokedetail", pokeDetail)
  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeDetail}/`)
  .then(apiRes => {
    console.log('this is apiRes', apiRes.data)
    const name = req.params.name
    const image = apiRes.data.sprites.other.dream_world.front_default
    const abilities = apiRes.data.abilities
    const moves = apiRes.data.moves
    const stats = apiRes.data.stats
    
  
    res.render('favePokemon/show', {name: name, abilities: abilities, image: image, moves: moves, stats: stats})
  })
  .catch(error => {
    console.log(error)
  })
})


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  const data = JSON.parse(JSON.stringify(req.body))
  console.log('this is data', data)
  db.pokemon.create({
    name: data.name
  })
  // TODO: Get form data and add a new record to DB
  .then(createdFave => {
    console.log('db instance created: \n', createdFave)
    res.redirect('/');
  })
  .catch(error => {
    console.log(error)
  })
  
});

module.exports = router;
