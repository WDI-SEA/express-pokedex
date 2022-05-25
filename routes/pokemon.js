const { default: axios } = require('axios');
const express = require('express');
const { redirect } = require('express/lib/response');
const router = express.Router();
const db = require("../models");

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async(req, res) => {
  // TODO: Get all records from the DB and render to view
  const pokemons = await db.pokemon.findAll()
  res.render('pokemon/index.ejs', {pokemons});
});


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async(req, res) => {

  // TODO: Get form data and add a new record to DB
  await  db.pokemon.create(req.body)
  res.redirect('/pokemon')
});

//SHOW -- GET ROUTER
router.get('/:name', async (req, res) =>{
  let pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${req.params.name}`;
  const pokemonData = await axios.get(pokemonUrl)

  console.log(pokemonData.data)


    // const pokemons = await db.pokemon.findAll()
    res.render('pokemon/show.ejs', {
      name: req.params.name,
      pokemonData
    })
})

module.exports = router;
