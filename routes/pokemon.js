const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios')


// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
    .then(fave => {
      // create new page of favorites, fave.ejs
    res.render('favorites', {results:fave})
    })
    .catch(error => {
    console.error
    })
//   res.send('Render a page of favorites here');
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  const data = JSON.parse(JSON.stringify(req.body))
  console.log('this is data', data)
  // res.send(req.body);
  db.pokemon.create({
    name: data.name
  })
  .then(createdFave =>{
    res.redirect('/pokemon')
  })
  .catch(error => {
    console.log(error)
  })
})

// SHOW
router.get('/:name', (req, res) => {
  const pokeName = req.params.name
  // console.log('this is pokeName', pokeName)
  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}/`)
    .then(apiRes => {
      const abilities = apiRes.data.abilities
      const image = apiRes.data.sprites.other.dream_world.front_default
      const moves = apiRes.data.moves
      const stats = apiRes.data.stats
      const name = req.params.name
      // res.send(JSON.parse(JSON.stringify(apiRes.data)))
      res.render('detail', {name: name, abilities: abilities, image: image, moves: moves, stats: stats})
    })
    .catch(error => console.error)
})

router.delete('/:name', (req, res) => {
  // console.log("this is the id\n", req.params.id)
  db.pokemon.destroy({
      where: { name: req.params.name }
  })
  .then(deletedItem => {
      res.redirect('/pokemon')
  })
  .catch(error => {
      console.error
  })
})

module.exports = router