const { default: axios } = require('axios')
const express = require('express')
const router = express.Router()
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
    .then(faves => {
      // res.render('indexFaves', {results: faves})
      res.render('pokemon/index',{favorites:faves})
    })
    .catch(hi => {
      console.error
    })
  // console.log(db.pokemon)
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  res.send(req.body)
})

module.exports = router