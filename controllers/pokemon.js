const express = require('express');
const router = express.Router();
const db = require("../models");
const axios = require('axios'); 

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  const allFaves = await db.pokemon.findAll();
  console.log(allFaves.name);
  try {
  res.render("pokemon/index.ejs", {
    allFaves
  })
  } catch(err) {
    console.log(err);
    res.status(500).send("Server had an error.")
  // res.send('Render a page of favorites here');
}});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
// console.log(req.body);
  try {
    const newPokemon = await db.pokemon.create({name: req.body.name, url: req.body.url }) 
    res.redirect('/pokemon')
  } catch (err) {
    console.log(err);
    res.status(500).send("Server had an error.")
  }

  // res.send(req.body);
});

//GET /pokemon/pokemon_name
router.get("/:name", (req, res) => {
  pokeName = req.params.name;
  console.log(pokeName)
  let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
  axios.get(pokemonUrl).then(apiResponse => {
    let pokemon = apiResponse.data
    console.log(pokemon.stats.stat)
    res.render("pokemon/show", { pokemon: pokemon })
  })
})

module.exports = router;