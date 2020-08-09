const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');


// GET /pokemon - return a page with favorited Pokemon
router.get('/',async (req, res) => {
  // TODO: Get all records from the DB and render to view
  const locatePoke = await db.pokemon.findAll() 
  res.render('favorites', { pokemon: locatePoke });  
});


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  await db.pokemon.findOrCreate({
    where: {
      name: req.body.name,
    }
  });
  res.redirect('/pokemon');
});

module.exports = router;

//Delete /pokemon 
