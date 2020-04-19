var express = require('express');
var router = express.Router();
let db = require('../models')
let axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then((pokemon) => {
  	res.render('favorites/pokemon', { pokemon })
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

router.get('/show', (req, res) => {
	let pokemonURL = `http://pokeapi.co/api/v2/pokemon/${req.query.name}`
	console.log(pokemonURL)
	axios.get(pokemonURL)
.then((apiResponse) => {
	let pokemon = apiResponse.data.results
	res.render('favorites/show', { pokemon })
	console.log(pokemon + ' is coming back')
})
.catch((err) => {
  	res.send(err)
})

})


module.exports = router;
