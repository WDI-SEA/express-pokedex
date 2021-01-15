const express = require('express')
const router = express.Router()
const db = require('../models')
const axios = require('axios'); 

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  // res.send('Render a page of favorites here');
  db.pokemon.findAll().then(pokemons => {
    res.render('pokemon.ejs', {pokemons: pokemons})
  })
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.findOrCreate({
  where: {
    name: req.body.name 
  },
    defaults: { 
      name: req.body.name 
    }
  }).then( ([pokeman, wasCreated]) => {
    res.redirect('/pokemon')
  })
})

router.get('/:name', (req, res) => {
  let endpoint = `http://pokeapi.co/api/v2/pokemon/${req.params.name}/`
  axios.get(endpoint).then(apiResponse => {
    let details = apiResponse.data
    let moves = details.moves.slice(0, 5)
    res.render('show.ejs', {details: details, abilities: details.abilities, height: details.height, name: req.params.name, moves: moves})
  })
})

// moves is an array of objects


module.exports = router
