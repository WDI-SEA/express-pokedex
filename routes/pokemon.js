const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
    .then(pokemon => {
      //create ejs for displaying favorites
      res.render('favorites', { results: pokemon })
    })
  // res.send('Render a page of favorites here');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  const formData = JSON.parse(JSON.stringify(req.body))
  db.pokemon.create({
    name: formData.name
  })
    .then(created => {
      console.log('this the entry created:\n', created.name)
      res.redirect('/pokemon')
    })
    .catch(err => {
      console.log(err)
    })
  // res.send(req.body);
})

// /: sets up a 'variable' from url
router.get('/:name', (req, res) => {
  //extract name from params to pass into API call
  const pokeName = req.params.name
  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
    .then(apiRes => {
      const name = req.params.name
      const stats = apiRes.data.stats
      const moves = apiRes.data.moves
      const abilities = apiRes.data.abilities
      const image = apiRes.data.sprites.other.dream_world.front_default
      // res.send(JSON.parse(JSON.stringify(apiRes.data)))
      res.render('details', { abils: abilities, image: image, moves: moves, stats: stats, name: name })
    })
    .catch(error  => console.error)
})

module.exports = router;
