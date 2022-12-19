const express = require('express');
const router = express.Router();
const axios = require('axios'); 
const db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  try{
  // TODO: Get all records from the DB and render to view
  // Imports all routes from the pokemon routes file
  const allPoke = await db.pokemon.findAll()
  res.render('pokemon.ejs', {
    allPoke: allPoke
  })
  }
  catch(err){
    console.log('get /pokemon error ', err)
  }
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  try{
  // TODO: Get form data and add a new record to DB
  // Imports all routes from the pokemon routes file
  const returnArray = await db.pokemon.findOrCreate({
    where:{
      name: req.body.name
    }
  })
  const [pokemon, created] = returnArray
  res.redirect('/pokemon')
  }
  catch(err){
    console.log('post /pokemon error ', err)
  }
  })

  // GET /pokemon/:name - return a page with information about a pokemon
router.get('/:name', async (req, res) => {
  try{
  let pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${req.params.name}`;
  // Use request to call the API
  axios.get(pokemonUrl)
    .then(apiResponse => {
    let pokemon = apiResponse.data;
    res.render('show', {pokemon: pokemon});

  })
  }
  catch(err){
    console.log('get /pokemon/:name error ', err)
  }
});

module.exports = router;
