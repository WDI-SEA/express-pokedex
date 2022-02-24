const { default: axios } = require('axios');
const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const db = require('../models');
// const pokemon = require('../models/pokemon');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  try{
    // reads all from pokemon table
    let displayPokedex = await db.pokemon.findAll()
    // display pokedex page with array of pokemon from table passed in
    res.render('./pokemon/index.ejs', {displayPokedex})
  } catch(error) {
    console.log(error)
  }
});

// display more info about each pokemon
router.get('/:name', async (req, res)=>{
  try {
    const response = await axios.get(`http://pokeapi.co/api/v2/pokemon/${req.params.name}`)
    // res.json(response.data.sprites.front_default)
    res.render('./pokemon/show.ejs', {
      name: response.data.name,
      height: response.data.height,
      weight: response.data.weight,
      image: response.data.sprites.front_default,
      abilities: response.data.abilities,    // array
      types: response.data.types,    // array
    })
  } catch (error) {
    console.log(error)
  }
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  try {
    const addToPokedex = await db.pokemon.findOrCreate({
      where: {
        name: req.body.name
      }
      // defaults: {
      //   name: req.body.name
      // }
    })
  } catch (error) {
    console.log(error)
  }
  res.redirect('/pokemon');
});

module.exports = router;