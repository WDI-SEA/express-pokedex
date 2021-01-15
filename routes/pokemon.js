const express = require('express');
const router = express.Router();
db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll()
  .then((pokes) => {
    res.render('pokemon/index', { pokemon:pokes });
  });
  // TODO: Get all records from the DB and render to view
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create({ name:req.body.name })
  .then((pokemon) => {
    res.redirect('/');
    console.log(`${pokemon.name} was added to favorites!`)
  }).catch((err) => {
    console.log(err)
  });
  // TODO: Get form data and add a new record to DB
});

module.exports = router;
