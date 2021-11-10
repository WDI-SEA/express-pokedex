const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios');
// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
    .then(faves => {
      res.render('indexFaves', { results: faves });
    })
    .catch(error => {
      console.error
    })

});

// SHOW ROUTE
router.get('/:name', (req, res) => {
  let pokemon = req.params.name
  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
    .then(result => {
      let pokeName = result.data.name
      let pokeNum = result.data.id
      let pokeType = result.data.types[0].type.name
      let pokeImg = result.data.sprites.other.dream_world.front_default
      let pokeAbilities = result.data.abilities
      res.render('show', { pokeName, pokeNum, pokeImg, pokeType, pokeAbilities })
    })
    .catch(error => {
      console.error
    })
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  const data = JSON.parse(JSON.stringify(req.body))
  //console.log('this is the data: ', data)
  // TODO: Get form data and add a new record to DB
  db.pokemon.create({
    pokeName: data.name
  })
    .then(createdFave => {
      //res.send(req.body);
      res.redirect('/pokemon')
    })
    .catch(error => {
      console.error
    })
});

module.exports = router;
