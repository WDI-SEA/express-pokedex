let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', (req, res) => {
  db.pokemon.findAll()
  .then((pokemon) => {
    res.render('pokemon/index', { pokemon })
  })
  .catch((err) => {
    console.log('Error in GET /pokemon', err)
    res.render('404')
  })
})

router.post('/', (req, res) => {
  console.log(req.body)
  db.spot.create(req.body)
  .then((createdPokemon) => {
      res.redirect('/pokemon' + createdPokemon.id)
  })
  .catch((err) => {
    console.log('Error in POST /pokemon', err)
    res.render('404')
  })
})

router.get('/new', (req,res) => {
  res.render('pokemon/new')
})

router.get('/:id', (req, res) => {
  db.spot.findByPk(req.params.id)
  .then((foundPokemon) => {
    res.render('pokemon/show', {
      spot: foundPokemon
    })
  })
  .catch((err) => {
    console.log('Error in GET /pokemon/:id', err)
    res.render('404')
  })
})

module.exports = router