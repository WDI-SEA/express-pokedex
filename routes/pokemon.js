const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  db.pokemon.findAll()
  .then(poke =>{
    res.render('favorite', {results: poke})
  })
  .catch(error => {
    console.error
  })
  // TODO: Get all records from the DB and render to view
  // res.send('Render a page of favorites here');
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  const data = JSON.parse(JSON.stringify(req.body))
  console.log('this is data', data)
  db.pokemon.create({
    name: data.name
  })
  .then(createdFave =>{
    res.redirect('/pokemon')
  })
  .catch(error => {
    console.error
  })
  // TODO: Get form data and add a new record to DB

})

router.get('/:name', (req, res) => {
  const pokeName = req.params.name
  console.log('this is pokeName', pokeName)
  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}/`)
  .then(apiRes => {
      const image = apiRes.data.sprites.other.dream_world.front_default
      const abilities = apiRes.data.abilities
      const moves = apiRes.data.moves
      const stats = apiRes.data.stats
      const name = req.params.name
      // res.render(JSON.parse(JSON.stringify(apiRes.data)))
      res.render('pokeDetail', {name: name, abils: abilities, image:image, moves: moves, stats: stats})
  })
  .catch(error => {
      console.error
  })
})

router.delete('/:name', (req,res) =>{
  db.pokemon.destroy({
    where: {name: req.params.name}
  })
  .then(deletedItem =>{
    res.redirect('/pokemon')
  })
  .catch(err=>{
    console.err
  })
})
module.exports = router
