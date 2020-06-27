var express = require('express');
const { render } = require('ejs');
var router = express.Router();
let db = require('../models');
const { default: Axios } = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(pokemons => {
    res.render('favorites', {pokemons})
  })
});


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  res.send(req.body);
});


module.exports = router;
