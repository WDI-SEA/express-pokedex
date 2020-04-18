var express = require('express');
var router = express.Router();
let db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then((pokemon) => {
  	
  	res.render('favorites/show', { pokemon })
  	console.log(pokemon)
  })
  .catch((err) => {
  	res.send(err)
  })
  
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create(req.body)
  .then(() => {
  	res.redirect('/pokemon')
  })
  .catch((err) => {
  	res.send(err)
  })
});

module.exports = router;
