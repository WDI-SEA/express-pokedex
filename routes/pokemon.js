var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');
var characteristics = [];
var stats = [];
var abilities = [];

router.get('/:id', function(req, res) {
	db.pokemon.findById(req.params.id).then(function(poke) {
		poke = poke.get({ plain: true })
		var urlToCall = `https://pokeapi.co/api/v2/pokemon/${poke.name}/`;
		request(urlToCall, function (error, response, body) {
			if (error) {
				console.log('Error:',error)
			} else {
				pokemonStats = JSON.parse(body);
				characteristics = pokemonStats.abilities;
				//returns array of objects with PK name and url
				characteristics.forEach(showAbility);
				console.log('Stats:',stats)
				//returns array of ability names
				stats.forEach(abilityName);
				console.log('RETURNING CHARACTERISTICS:',abilities);
				res.render('details', { pokemon: pokemonStats.name, abilities: abilities })
			}
		})
		console.log("Returning Pokemon:",poke)
	})
})

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(function(poke) {
        // console.log('Found: ', poke);
        var pokemon = poke.map(fav => fav.get({plain:true}));
        console.log(pokemon)
    res.render('favorites', { pokemon: pokemon });
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create({
        name: req.body.name
    }).then(function() {
        res.redirect('/pokemon');
  });
});

module.exports = router;

function showAbility(object){
	stats.push(object.ability)
	return stats
	console.log('Function Stats:',stats)
	console.log('showAbility function ran')
}

function abilityName(object){
	abilities.push(object.name)
	return abilities
	console.log('abilityName function ran')
	console.log(characteristics)
}









