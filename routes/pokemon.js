const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
    try {
      const favePokemon = await db.pokemon.findAll()
      res.render('pokemon/index.ejs', {favePokes: favePokemon})
    }catch (err) {
      console.log(err)
    }

});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  try{
    await db.pokemon.create({name: req.body.name})
    res.redirect('/pokemon')
  }catch (err) {
    console.log(err)
  }
});

// GET one individual pokemon
router.get('/:name', (req, res) =>{
  // the pokemons name
  let pokeName = req.params.name
  console.log(pokeName)
  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
    .then(apiRes =>{
      let imgSrc = apiRes.data.sprites.front_shiny
      let type = apiRes.data.types[0].type.name
      let height = apiRes.data.height
      let weight = apiRes.data.weight
      res.render('pokemon/show', {
        name: pokeName,
        

      })
    })
})

module.exports = router;
