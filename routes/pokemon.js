const express = require('express');
const router = express.Router();
const axios = require('axios')
//Enable Sequelize
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  // res.send('Render a page of favorites here');
  db.pokemon.findAll()
  .then(pokeMonsters => {
    res.render('index.ejs', {pokemon: pokeMonsters})
  })
  .catch(error => {
    console.error
  })
});

// GET /more/:name
router.get('/:name', (req, res) => {
  let pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${req.params.name}/`
  // console.log(req.params.name)
  //Use request to call the API
  axios.get(pokemonUrl)
  .then(apiResponse => {
    // console.log(apiResponse.data)
    let pokeName = apiResponse.data.name
    const abilities = apiResponse.data.abilities
    const height = apiResponse.data.height
    const stats = apiResponse.data.stats
    const weight = apiResponse.data.weight
    // console.log(pokeName, abilities, height, weight)
    res.render('show', {pokeName, abilities, stats, height, weight})
  })
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  const data = JSON.parse(JSON.stringify(req.body))
  // res.send(req.body);
  db.pokemon.create({
    name: data.name
  })
  .then(() => {
    res.redirect('/pokemon/')
  })
  .catch(error => {
    console.log(error)
  })
});

module.exports = router;
