const db = require('../models')
const express = require('express');
const router = express.Router();
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  const favePokemons = await db.pokemon.findAll()
  console.log(favePokemons, 'these are the faves')
  res.render('faves', {
    favorites: favePokemons
  });
});

router.get('/:name', (req,res) => {
  const name =req.params.name
  console.log(name)
  axios.get(`http://pokeapi.co/api/v2/pokemon/${name}`).then(apiResponse => {
    let details = apiResponse.data;
    console.log(apiResponse.data)
    res.render('show', {
      pokemon: details
    });
  })
})
// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  const newFave = req.body.name
  const [user,created] = await db.pokemon.findOrCreate({
    // what to search for
    where: {
        name: newFave
    },
    // what to add if not found
    defaults: {
        // everything not in where clause 
    } 
})
  res.redirect('/pokemon');
});

module.exports = router;
