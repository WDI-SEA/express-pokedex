var express = require('express');
var router = express.Router();
var db = require('../models')
var axios = require('axios'); 

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(function(pokemons)  {
  	res.render('favorites', {pokemons: pokemons});
  })
  .catch(err => {
  	console.log(err, 'oopsie')
  })
  
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create(req.body)
  .then(() => {
  	res.redirect('/pokemon')
  })
  .catch(err => {
  	console.log(err, 'oopsie')
  })
});

router.get('/:id', function(req,res) {

	db.pokemon.findOne( {
		where: { id: req.params.id }
	})
	.then((pokemon) =>{
		var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + pokemon.name;
		axios.get(pokemonUrl).then(function(apiResponse) {
	    var pokemonData = apiResponse.data;
	    console.log(pokemonData.abilities[0].ability.name)
	    //console.log(apiResponse.data)
	    // res.send(pokemonData)
	    res.render('show', { pokemonData: pokemonData});
	  })
	 // res.render('show', { pokemon: pokemon })
	})
	.catch(err => {
		console.log(err, 'bad')
	})
	
	

})

module.exports = router;
