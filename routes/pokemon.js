const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
    .then(poke =>{
      // console.log('this is fave', poke)
      res.render('indexFaves.ejs', {results: poke})
    })
    .catch(error =>{
      console.error
    })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
    const data = JSON.parse(JSON.stringify(req.body))
    res.send(req.body);
    db.pokemon.create({
      name: data.name
    })
    .then(createdFave =>{
      console.log('fave created', createdFave)
      res.redirect(`/pokemon`)
    })
    .catch(error =>{
      console.error
    })
});

// SHOW 
router.get('/:name', (req, res) =>{
  const pokeName = req.params.name
  axios.get(`http://pokeapi.co/api/v2/pokemon/${pokeName}/`)
    .then(apiRes => {
      const image = apiRes.data.sprites.other.dream_world.front_default
      const abilities = apiRes.data.abilities
      const moves = apiRes.data.moves
      const stats = apiRes.data.stats
      const name = req.params.name
      res.render('detail', {name: name, image: image, abilities: abilities, moves: moves, stats: stats})
      // res.send(apiRes.data)
    })
    .catch(error =>{
      console.error
  })
})


module.exports = router;
