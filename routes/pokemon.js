const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  //res.send('Render a page of favorites here'); tests work ready to render
  const getPokemon = await db.pokedex.findAll();
  res.render('favoritePoke', {pokemon: getPokemon});
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  db.pokedex.findOrCreate({
    where: {
      name: req.body.name
    }
  }).then(pokemon => {
    console.log('created: ', pokemon.name)
  })
  res.redirect('/pokemon')
});

router.get('/:id', (req, res) => {
  let pokemonID = req.params.id;
  let pokemonURL = `http://pokeapi.co/api/v2/pokemon/${pokemonID}`
  axios.get(pokemonURL).then(response => {
    let pokemon = response.data;
    res.render('show', {pokemon: pokemon})
     // relates to ejs
     //console.log(pokemon.data.sprites);
  }).catch(err => console.log(err));
});

module.exports = router;
