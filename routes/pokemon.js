const express = require('express')
const router = express.Router()
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(pokemon => {
    res.render('pokemon/index.ejs', {pokemon: pokemon})
  })
})
// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  db.pokemon.create ({
    name: req.body.name
  })
  .then (apiResponse => {
    res.redirect('/pokemon')
  })
})




module.exports = router
