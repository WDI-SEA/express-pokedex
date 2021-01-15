const express = require('express');
const router = express.Router();
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/index', function(req, res) {
  // TODO: Get all records from the DB and render to view
db.pokemon.findAll().then(poke => {
    console.log(poke)
    res.render('index.ejs', {pokemon: poke});
})
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  console.log(db.pokemon)

  db.pokemon.create({
    name: req.body.name
  }).then(poke => {
    console.log('Created: ', poke.name)
    res.redirect('/pokemon/index')
  })
});

module.exports = router;
