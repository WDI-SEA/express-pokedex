const express = require('express');
const db = require('../models');
const router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  //res.send('Render a page of favorites here');
  db.pokemon.findAll().then(pokemons=>{
    res.render('pokemon/index',{pokemon: pokemons})
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create({
    name: req.body.name
  }).then(poke=>{
    console.log('Added this pokemon to Favs: '+poke.name)

  })
  
});

module.exports = router;
