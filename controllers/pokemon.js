const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios')


router.post("/", async (req, res) => {
  try {
    await db.pokemon.findOrCreate({
      where: req.body
    })
    res.redirect('pokemon')
  } catch(err){
    console.log(err)
    res.status(500).send("Server had an error")
 }
})

router.get('/', async (req, res) => {
  try {
    const allPokemon = await db.pokemon.findAll()
    res.render('pokemon', {allPokemon})
  } catch(err) {
    console.log(err)
    res.status(500).send('Server had an error')
  }
})

router.get('/:name', (req, res) => {
  let pokemonName = req.params.name;
  let pokemonDetailsUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

  // Use axios to call the API
  axios.get(pokemonDetailsUrl)
    .then(apiResponse => {
      let pokemon = apiResponse.data;
      res.render('show', { pokemon: pokemon });
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error.message);
    });
});

module.exports = router;