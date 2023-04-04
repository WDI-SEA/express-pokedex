const express = require('express');
const router = express.Router();
const db = require('../models');
const Pokemon = db.pokemon;

router.get('/', async (req, res) => {
  let allFavePokemon = await Pokemon.findAll();
  console.log(allFavePokemon);
  res.render('pokemon', {
    pokemon: allFavePokemon
  });
});

router.post('/', async (req, res) => {
  let newPokemon = await Pokemon.create({name: req.body.name});
  console.log(newPokemon);
  res.redirect('pokemon');
});

module.exports = router;
