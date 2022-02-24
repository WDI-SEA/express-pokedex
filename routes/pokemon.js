const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  try {
    const allFaves = await db.pokemon.findAll()
    res.json(allFaves)
  } catch (error) {
    console.log(error)
  }
  // TODO: Get all records from the DB and render to view
  res.send('Render a page of favorites here');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  try {
    await db.pokemon.create({
      name: requestAnimationFrame.body.name
    })

    res.redirect('/pokemon')
  } catch(error) {
    console.log(error)
  }
  // TODO: Get form data and add a new record to DB
  res.send(req.body);
});

module.exports = router;

router.get("/:name", (req,res) => {
  let pokeName = req.params.name
  console.log(poke.name)
  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}/`)
  .then(apiRes => {
    let imgSrc = apiRes.data.sprites.front_shiny;
    let types = apiRes.data.types[0].type.name
    let height = apiRes.data.height
    let weight = apiRes.data.weight
    res.json({imgSrc})

  })
})