const express = require('express');
const router = express.Router();
db = require('../models');
const axios = require('axios'); 

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll()
  .then((pokes) => {
    res.render('pokemon/index', { pokemon:pokes });
  });
  // TODO: Get all records from the DB and render to view
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create({ name:req.body.name })
  .then((pokemon) => {
    res.redirect('/');
    console.log(`${pokemon.name} was added to favorites!`)
  }).catch((err) => {
    console.log(err)
  });
  // TODO: Get form data and add a new record to DB
});

router.get('/:name', (req, res) => {
  // name api request variable
  let pokemonName = req.params.name;
  let pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  axios.get(pokemonUrl).then(apiResponse => {
    let pokemon = apiResponse.data;
  //pull info from api
  // put url and concatenate pokemon var into it
  // need req.params.name
  res.render('pokemon/details', { pokemon })
})
});

module.exports = router;
