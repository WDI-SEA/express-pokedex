const express = require('express');
const { DatabaseError } = require('pg-protocol');
const db = require('../models');
const router = express.Router();
const axios = require('axios');
// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  async function findAllPokemon(){
    try {
      const pokemon = await db.pokemon.findAll()
      console.log(pokemon);
      res.render('pokemon/favorites', { pokemon:pokemon })
      // res.send(pokemon)
    }catch (error) {
        console.log(error)
      }
     }
  findAllPokemon()

});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  let pokeName = req.body.name
  async function findOrCreatePokemon(){
    try {
      // the findOrCreate promise returns an array with two elements,
      // so 'array destructuring' is used to assign the names to the elements
      const [pokemon, created] = await db.pokemon.findOrCreate({
        // where is used search for values in columns
        where: {
          name: pokeName
        }
          })
      console.log(`${pokemon.name} was ${created ? 'created' : 'found'}`)
    } catch (error) {
      console.log(error)
    }
  }
  findOrCreatePokemon()
  res.redirect('/pokemon');
});

router.get('/:name', (req, res) => {
  // TODO: Get all records from the DB and render to view
  let name = req.params.name
  async function findOnePokemon(){
    try {
      let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${name}/`;
    
      const apiResponse = await axios.get(pokemonUrl)
      let pokemon = apiResponse.data;
      console.log(pokemon)
      res.render('pokemon/show', { pokemon })
    } catch (error) {
      console.log(error)
    }
  }
  findOnePokemon()

});
module.exports = router;

