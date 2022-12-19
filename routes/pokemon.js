const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios')
// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  try {
    const favPokemon = await db.pokemon.findAll()
    res.render('faves.ejs', {
      favPokemon: favPokemon
    })
      //console.log(favPokemon)
    
  } catch (error) {
    console.log(error)
  }
  // TODO: Get all records from the DB and render to view
  
});
// READ function to finAll favorited pokemon to display on the screen

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  try {
    const favPokemon = await db.pokemon.findOrCreate({
      where: {
        name: req.body.name
      }
    })
  } catch (error) {
    console.log(error)
  }
  // TODO: Get form data and add a new record to DB
  res.redirect('/pokemon');
});

//GET add a route that renders a show page that pulls data from the api provided
router.get('/:name', async (req,res) => {
  try {
    const url =`http://pokeapi.co/api/v2/pokemon/${req.params.name}`
    //console.log(url)
    const response = await axios.get(url)
    res.render('show.ejs', {
      pokemon: response.data,
      name: req.params.name
    })
  } catch (error) {
    console.log(error)
    res.status(500).send('api error')
  }
})
module.exports = router;
