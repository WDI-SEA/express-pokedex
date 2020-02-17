var express = require("express");
var router = express.Router();
const db = require("../models");
const axios = require('axios');
// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(function(response){
  	let allPokemon = response;
  	console.log(allPokemon);
  	res.render("favorites", {pokemons: allPokemon});
  }).catch(err => {
  	console.log(err);
  	res.send("ERROR");
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
	db.pokemon.findOrCreate({
		where: {
			name: req.body.name
		},
		default:{
			name: req.body.name
		}
	}).then(function([pokemon, created]){
		if(created){
			console.log(`CREATED pokemon ${pokemon.name}`);
		} else {
			console.log(`found pokemon ${pokemon.name}`);
		}
		res.redirect("/pokemon");
	}).catch(err => {
		console.log(err);
		res.send("ERROR");
	})
  // TODO: Get form data and add a new record to DB
});

router.get('/:id', function(req, res) {
	console.log(req.params.id);
	let pokemonName = req.params.id;
	pokemonName = pokemonName.toLowerCase();
	let pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${pokemonName}/`;
	axios.get(pokemonUrl).then(function(apiResp) {
		var pokemonDetails = apiResp.data;
		//console.log(pokemonDetails);
		console.log(pokemonDetails.types)
		res.render("details", {pokemon: pokemonDetails});
	}).catch(err => {
		console.log(err);
		res.send("ERROR");
	});
})

module.exports = router;
