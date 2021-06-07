const express = require('express');
const router = express.Router();
let db = require("../models")

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // Get all records from the DB of pokemons
  db.Pokemon.findAll()
    .then(result => {
      // render pokemon/index.ejs with returned pokemon data
      res.render('pokemon/index', {pokemons: result})
    })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  res.send(req.body);
});

module.exports = router;
