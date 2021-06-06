const express = require('express');
const router = express.Router();
let db = require('../models');
let axios = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async(req, res) => {
  // TODO: Get all records from the DB and render to view
  let pokemons = await db.pokemon.findAll();
  res.render('pokemon/index', { pokemons: pokemons });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  let pokemon = await db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  });
  res.redirect('/pokemon');
});

// GET /pokemon/:id 
router.get('/:name', async (req,res) => {
  let response = await axios.get(`https://pokeapi.com/api/v2/pokemon/${req.params.name}`)
  res.render('pokemon/show', {inof: response.data})
});

//DELETE /pokemon/:id 
router.delete('/:name', async (req, res) => {
  let numRowsDeleted = await db.pokemon.destroy({
    where: {
      name: req.params.name
    }
  })
  console.log(numRowsDeleted)
  res.redirect('/pokemon')
});

module.exports = router;
