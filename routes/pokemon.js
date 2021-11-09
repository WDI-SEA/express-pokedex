const express = require('express');
const router = express.Router();
const axios = require('axios')
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
//   // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(fav => {
      res.render('indexFav', {results: fav})
  })
  .catch(error => {
      console.error
  })
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  const data = JSON.parse(JSON.stringify(req.body))
  console.log('this is data', data)
  db.pokemon.create({
    name: data.name
  })
  .then(() => {
    res.redirect('/pokemon')
  })
  .catch(error => {
    console.error
  })
})

router.get('/:name', (req, res) => {
  let pokemonName = req.params.name
  axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
  .then(apiRes => {
    console.log('this is the apiRes.data', apiRes.data)
    let name = apiRes.data.name
    let image = apiRes.data.sprites.front_default
    let height = apiRes.data.height
    let weight = apiRes.data.weight
    let abilities = apiRes.data.abilities[0].ability.name
    let moves = apiRes.data.moves[0].move.name

    res.render('detailFav', {name: name, image: image, height: height, weight: weight, abilities: abilities, moves: moves})
  })
  .catch(error => {
    console.error
  })
})

module.exports = router