var express = require('express');
var db = require('../models');
var request = require('request')
var router = express.Router();

router.use(require('morgan')('dev'));

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(function(poke) {
	  res.render('pokemon/index', { poke: poke })
	  console.log('Found: ', poke.name)
	})
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create({
	  name: req.body.name
	}).then(function(poke) {
		res.redirect('pokemon')
	})
});

router.get('/:id', (req, res) => {
	db.pokemon.findByPk(req.params.id)
	.then((poke) => {
		var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + poke.dataValues.name + '/';
	  // Use request to call the API
	  request(pokemonUrl, function(error, response, body) {
	    var pokemon = JSON.parse(body);
			res.render('pokemon/show', { poke: poke, pokemon: pokemon })
	  })
	})
})

module.exports = router;
