const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then((pokemon) => {
    res.render('index.ejs', { pokemon });
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  db.pokemon
    .create({
      where: {
        name: req.body.name,
      },
    })
    .then(() => {
      res.redirect('/pokemon');
    })
    .catch((err) => {
      console.error(err.message);
    });
});

//Display more info on each Pokemon
router.get('/:name', (req, res) => {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.name}`).then((apiResponse) => {
    res.render('show', { pokemon: apiResponse.data });
  });
});

module.exports = router;
