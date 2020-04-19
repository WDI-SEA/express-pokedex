var express = require('express');
var router = express.Router();
let db = require('../models');
const axios = require('axios');
const methodOverride = require('method-override');
router.use(methodOverride('_method'));

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then((faves) => {
  	res.render('faves', { pokemon: faves })
  })
});

router.get('/:id', (req, res) => {
	db.pokemon.findByPk(req.params.id)
	.then((result) => {
		let pokemonURL = 'http://pokeapi.co/api/v2/pokemon/' + result.name + '/';
		axios.get(pokemonURL)
		.then((response) => {
			res.render('show', { pokemon: response.data })
		})
	})
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
db.pokemon.findOrCreate({
	where: { name: req.body.name }
	}).then((fave) => {
		res.redirect('pokemon')
	})
});

router.delete('/:id', (req,res) => {
	db.pokemon.destroy({
		where: {
      name: req.params.id
    }
	})
	.then(function(pokemon) {
		res.redirect('/pokemon')
	})
})

module.exports = router;
