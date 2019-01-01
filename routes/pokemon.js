var express = require('express');
var router = express.Router();
var db = require('../models');
var pokemon = db.pokemon.findAll()

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
 	pokemon = db.pokemon.findAll()
 	.then(function(poke){
		console.log('Found: '+poke.name)
	});
	  res.render('favorites', { pokemon: pokemon });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
	db.pokemon.create({
		name: req.body.name
	}).then(function(poke){
		console.log('Created: '+poke)
	});
	  res.redirect('/pokemon');
});

module.exports = router;
