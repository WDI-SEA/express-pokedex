const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios'); 

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(poke =>{
    // res.send(poke);
    res.render('pokemon', {poke : poke})
  })
  // res.send('Render a page of favorites here');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: { name: req.body.name },
    defaults: {}
  }).then(([pokemon, created]) =>{
    console.log(`pokemon ${pokemon.name} was ${ created ? 'created' : 'found'}`);
    res.redirect('pokemon');
    process.exit();
  }).catch(err => console.log(err));
  //res.send(req.body);
});

router.get('/:name', function(req, res) {
  let pokeDisplayed = req.params.name;
  let pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${pokeDisplayed}`;
  // Use request to call the API
  axios.get(pokemonUrl).then(apiResponse => {
    let pokemon = apiResponse.data;
    // let pkImg = pokemon.sprites.front_default;
    //official-artwork.front_default;
    // let abilities = pokemon.abilities;
    // let stats = pokemon.stats;
    // let moves = pokemon.moves;
    // console.log(pokemon);
    // res.send(pkImg);
    res.render('details', { pokemon });
  })
});

module.exports = router;
