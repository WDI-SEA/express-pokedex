const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  const favePokes = await db.pokemon.findAll()
  res.render('pokemon/index.ejs', {favePokes})
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  await db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    },
    defaults: {
      name: req.body.name
    }
  })
  res.redirect('/pokemon', )
});

// GET details on a specific pokemon
router.get('/:name', (req, res) => {
  const poke = req.params.name
  const pokeDeets = `https://pokeapi.co/api/v2/pokemon/${poke}`
  axios.get(pokeDeets)
  .then(response => {
    res.render('pokemon/show.ejs', {pokeStats: response.data})
  })
})

//DELETE from faves
router.delete('/:name', async (req, res) => {
  try{
    const pokeNoMo = await db.pokemon.findOne({
      where:{
        name: req.params.name
      }
    })
    await pokeNoMo.destroy()
    res.redirect('/pokemon')
  }catch{
    console.log(err)
  }
})



module.exports = router;
