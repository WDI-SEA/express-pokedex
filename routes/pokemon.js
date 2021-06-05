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
    name: req.body.name
  })
  .then((post) => {
    res.redirect('/')
  })
  .catch((err) => {
    log(err)
  })
});

// GET /pokemon/:name - renders a show.ejs page with info about pokemon
router.get('/:name', (req, res) => {
  let name = req.params.name
  axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  .then(resFromAPI => {
    let pokeData = resFromAPI.data
    res.render('pokemon/show.ejs', {pokeData: pokeData})
  })
  .catch(err => {
    log(err)
  })
})




// EXPORT ROUTER
module.exports = router;
