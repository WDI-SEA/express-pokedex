const express = require('express');
const router = express.Router();
const db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(poke => {
    console.log(pokemon)
    res.render('index', {pokemon: poke})
    process.exit()
  })
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  db.poke.create(req.body.name).then(createdPoke => {
    console.log(createdPoke)
  }).then(([poke, wasCreated]) => {
    res.redirect('/pokemon')
  })
  res.send(req.body.name);
});

module.exports = router;
