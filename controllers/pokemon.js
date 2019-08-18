let router = require('express').Router();
const db = require('../models');
const axios = require('axios'); 
var request = require('request');


router.get('/', (req,res) => {
	db.pokemon.findAll()
	.then(pokemon => {
		res.render('pokemon/index', { pokemon })
	})
	.catch(err => {
		console.log('something bad happened')
		res.send('something bad happened')
	})
})

router.get('/:id', (req,res) => {
	db.pokemon.findOne({
		where:{id: req.params.id}
	})
	.then(foundpokemon => {
		var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/'+foundpokemon.name;
		console.log(pokemonUrl);
		axios.get(pokemonUrl).then( function(apiResponse) {
    		var pokemon = apiResponse.data;
			
			res.render('pokemon/show', {foundpokemon, pokemon})
			// console.log(pokemon)
		})
		
	})
	
})

router.post('/', (req,res) => {
	db.pokemon.create(req.body)
	.then(() =>{
		res.redirect('/')
	})
	.catch(err => {
		console.log('something went wrong')
		res.send('something went wrong')
	})
})


module.exports = router;

var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
  // Use request to call the API
  axios.get(pokemonUrl).then( function(apiResponse) {
    var pokemon = apiResponse.data.results;
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  })

// request('https://pokeapi.co/api/v2/type/' + req.params.name, (err, response, body) => {