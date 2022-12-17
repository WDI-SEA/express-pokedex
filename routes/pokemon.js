const express = require('express');
const db = require('../models');
const router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  try {
    // TODO: Get all records from the DB and render to view
    //READ function to find all favorite pokemon
    const favPokemon = await db.pokedex.findAll()
    res.render('index.ejs', {
      favPokemon: favPokemon
    })
  } catch (error) {
    console.log(error)
  }
});


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  try {
    const favArray = await db.pokedex.findOrCreate({
      where: {
        name: pokedex.name
      }
    })
    
  } catch (error) {
    
  }
  // TODO: Get form data and add a new record to DB
  res.send(req.body);
});

module.exports = router;
