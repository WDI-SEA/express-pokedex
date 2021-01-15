const express = require('express');
const router = express.Router();
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function (req, res) {
  // TODO: Get all records from the DB and render to view
  res.render('pokemon/index.ejs');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function (req, res) {
  db.pokemon.create({
    name: req.body.name
  }).then(createdFav => {
    console.log(createdFav)
    res.redirect('/pokemon')
  })
});

module.exports = router;
