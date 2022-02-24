const express = require('express');
const router = express.Router();
const db = require('../models');
const pokemon = require('../models/pokemon');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  res.send('Render a page of favorites here');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  try {
    const addToPokedex = await db.pokemon.findOrCreate({
      where: {
        name: req.body.name
      },
      defaults: {
        name: req.body.name
      }
    })
    console.log(addToPokedex)
  } catch (error) {
    console.log(error)
  }
  res.redirect('/pokemon');
});

module.exports = router;