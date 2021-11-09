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
  // res.send(req.body)
  const data = JSON.parse(JSON.stringify(req.body))
  // console.log('this is data:',data)
  db.pokemon.create({
    name: data.name
  })
    .then(createdFave => {
      // console.log('db instance created:\n', createdFave)
      res.redirect(`/pokemon`)
    })
    .catch(error => {
      console.error
    })
})

// SHOW route
router.get('/:name', (req, res) => {
  const name = req.params.name
  axios.get(`http://pokeapi.co/api/v2/pokemon/${name}/`)
    .then(apiResults => {
      console.log(apiResults.data.weight)
      const weight = apiResults.data.weight
      res.render('pokemon/show',{ weight })
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router