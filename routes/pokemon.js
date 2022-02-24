const { default: axios } = require('axios');
const express = require('express');
const db = require('../models');
const router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  try {
    const favePokemons = await db.pokemon.findAll()
    res.render("favoritesList.ejs", {favePokemons: favePokemons})
  } catch (error) {
    console.log(error)
  }
});

//GET /favorite pokemon list

router.get("/:name", async (req,res) => {
  let pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${req.params.name}`
    try {
      const response = await axios.get(pokemonUrl)
      const result = response.data
      res.render("show.ejs", {pokemon: result})
    } catch (error){
      console.log(error)
    }
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async(req, res) => {
  try {
    await db.pokemon.create({
      name: req.body.name
    })
    res.redirect("/pokemon")
  } catch (error) {
    console.log(error)
  }
  // res.send(req.body);
});



module.exports = router;
