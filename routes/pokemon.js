var express = require('express');
const db = require('../models');
var router = express.Router();
const axios = require('axios'); 

// GET /pokemon - return a page with favorited Pokemon
router.get('/', ((req, res) => {
  db.pokemon.findAll().then((pokemons) => {
    let pokemonList = JSON.stringify(pokemons);
    let pokemonData = JSON.parse(pokemonList)
    // TODO: Get all records from the DB and render to view
    res.render('pokemon/index', {myFavoritePokemons: pokemonData});
  }).catch((error) =>
    console.log(error)
  )
}))
// POST /pokemon - receive the name of a pokemon and add it to the database
// TODO: Get form data and add a new record to DB
router.post('/', ((req, res) => {
  db.pokemon.create({
    name: req.body.name
  }).then((newPokemon) => {
    console.log('You just created: ', newPokemon.name)
    res.redirect('/pokemon')
  }).catch((error) =>
  console.log(error)
  )
}))

router.get('/:name', ((req,res) => {
  let pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${req.params.name}`
  axios.get(pokemonUrl).then((apiResponse) => {
    let pokemonDetails = apiResponse.data;
    res.render('pokemon/details', {pokemon: pokemonDetails}) 
  }).catch((error) =>
  console.log(error)
  )
}))

// router.delete('/details/:name', (req, rex) => {
//   let pokemons = db.pokemon.findAll();
//   let pokemonList = JSON.stringify(pokemons)
//   pokemonList =JSON.parse(pokemonList)
//   pokemonList.splice(req.params.name, 1)
//   res.redirect('/pokemon')
//   if (error) {
//     console.log(error)
//   }
// })

module.exports = router;
