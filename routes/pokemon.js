const express = require('express');
const router = express.Router();
const axios = require('axios'); 
const db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll()
  .then(pokemons => {
    res.render('pokemon', { pokemons } )
  })
  // res.send('Render a page of favoritessdfsdfasd here');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
 db.pokemon.findOrCreate({
   where: { name: req.body.name }
 }).then(pokemon =>{
   console.log(`Pokemon ${req.body.name} was favorited!`)
   res.redirect('pokemon');
 }).catch(err => {
   console.log(err)
   res.send(404)
});
});

// GET /pokemon/:name
router.get('/:name', (req, res) => {
  console.log(req.params.name)
  // res.send(`Here is info on your fave ${req.params.name}`)
  //another axios call?
  let pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${req.params.name}`;
  // Use request to call the API
  axios.get(pokemonUrl).then(apiResponse => {
    let pokemon = apiResponse.data;
    let sprites1 = pokemon.sprites.other;
    // console.log(pokemon.types)
    //poison
    // console.log(pokemon.types[1].type.name);

    //sprite
    // console.log(pokemon.sprites.front_default);
    let sprites_n = pokemon.sprites.front_default;
    //sprite shiny
    // console.log(pokemon.sprites.front_shiny);
    let sprites_s = pokemon.sprites.front_shiny;

    console.log(pokemon.stats);
    res.render('detail', {name: pokemon.name, weight: pokemon.weight, height: pokemon.height, id: pokemon.id, types: pokemon.types, spriteN: sprites_n, spriteS: sprites_s, stats: pokemon.stats})
  })
});
//sprites: pokemon.sprites.other[1].front_default
module.exports = router;
