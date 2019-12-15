var express = require('express');
var router = express.Router();
let db = require('../models');
const axios = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then((poke) => {
    console.log('Found: ', poke.name)
    res.render('pokemon', {poke});
  })
  .catch((err) => {
    console.log('Err', err)
    res.render('error')
  })
});

//GET /pokemon/:id and display on show page
router.get('/:id', (req, res) => {
  // res.send('GET route to pokemon/id')
  db.pokemon.findByPk(req.params.id)
    .then((poke) => {
      let pokeURL = 'http://pokeapi.co/api/v2/pokemon/'
      axios.get((pokeURL)+poke.name)
      .then((apiResponse) => {
        // console.log(apiResponse)
        let pokeData = apiResponse.data
        // console.log(pokeData)
        console.log(poke.name)
        res.render('../views/show', {
          pokemonName: poke.name,
          pokemonHeight: pokeData.height,
          pokemonWeight: pokeData.weight,
          pokemonAbil1: pokeData.abilities[0].ability.name,
          pokemonAbil2: pokeData.abilities[1].ability.name,
          pokemonMove: pokeData.moves[0].move.name
        })
      })
      .catch((err) => {
        console.log('Err', err)
        res.send('error')
      })
    })
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/pokemon', (req, res) => {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create(req.body)
  .then((newPoke) => {
    console.log('Created: ', req.body.name)
  })
  .then(res.redirect('./pokemon')) 
});

module.exports = router;
