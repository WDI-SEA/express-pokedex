// MODULE SETUP ------------------------------------
const axios = require('axios')
const express = require('express')
const router = express.Router()
const db = require('../models')
const app = express()
const log = console.log

// ROUTES ---------------------------------------

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  db.pokemon.findAll()
  .then((pokemons) => {
    res.render('pokemon/index.ejs', { pokemons: pokemons})
  })
  .catch(err => {
    log(err)
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  db.pokemon.create({
    name: req.body.name,
    dexnum: parseInt(req.body.dexnum)
  })
  .then((post) => {
    res.redirect('/')
  })
  .catch((err) => {
    log(err)
  })
});

// DELETE /pokemon - delete pokemon from favorites page
router.delete('/', (req, res) => {
  db.pokemon.destroy({
    where: {
      id: req.body.id
    }
  })
  .then((post) => {
    res.redirect('/pokemon')
  })
  .catch(err => {
    log(err)
  })
})

// GET /pokemon/:name - renders a show.ejs page with info about pokemon
router.get('/:name', (req, res) => {
  let name = req.params.name

  let one = `https://pokeapi.co/api/v2/pokemon/${name}`
  let two = `https://pokeapi.co/api/v2/pokemon-species/${name}`

  const requestOne = axios.get(one)
  const requestTwo = axios.get(two)

  axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
    const responseOne = responses[0]
    const responseTwo = responses[1]
    let pokeDataOne = responseOne.data
    let pokeDataTwo = responseTwo.data
    res.render('pokemon/show.ejs', {pokeDataOne: pokeDataOne, pokeDataTwo: pokeDataTwo})
    })
  )
  .catch(err => {
    log(err)
  })
})

// EXPORT ROUTER
module.exports = router;