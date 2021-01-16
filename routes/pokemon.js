const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const db = require('../models')


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function (req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(pokemon => {
    res.send('Render a page of favorites here')
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/:id', function (req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  })
    .then(() => {
      res.redirect('/pokemon')
    })
    .catch(error => console.log(error))
});

router.get('/:name', (req, res) => {
  // console.log(req.params.name)
  let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${req.params.name}`
  axios.get(pokemonUrl).then(apiResponse => {
    let pokemon = apiResponse.data
    console.log(pokemon)
    res.render('Pokemon/show', {pokemon: pokemon})
    // res.json(pokemon)
  }).catch(error => console.log(error))
})

module.exports = router;
