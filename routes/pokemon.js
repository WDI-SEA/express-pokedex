const express = require('express');
const router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  res.send('Render a page of favorites here');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  res.send(req.body);
});

module.exports = router;
const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const db = require('../models')


// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  try {
    const allFaves = await db.pokemon.findAll()
    res.render('./pokemon/index.ejs', { pokemon: allFaves } )
    // res.json(allFaves)
  } catch(err) {
    console.log(err)
  }
  // res.send('Render a page of favorites here');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  try {
    await db.pokemon.create({
      name: req.body.name
  })
  // TODO: Get form data and add a new record to DB
  res.redirect('/pokemon')
  } catch (error) {
  console.log(error)
  }
  // res.send(req.body);
});

router.get('/:name', async (req, res) => {
  try {
    const response = await axios.get(`http://pokeapi.co/api/v2/pokemon/${req.params.name}`)
    res.render('pokemon/show.ejs', { pokemonDetails: response.data })
    console.log(response)
  } catch(error) {
    console.log(error)
  }

})

module.exports = router;