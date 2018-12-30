var express = require('express');
var router = express.Router();
var db = require('../models'); //this needed to be added to reference my db
var methodOverride = require('method-override');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
 	 db.pokemon.findAll().then( function(favorite) {
  		res.render('faves', {favorite: favorite})
 		}).catch( function(err) {
  			console.log('faves', err)
  			res.send('Error, check your logs!')
  			})
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  	db.pokemon.findOrCreate({
  		where: {name: req.body.name}
  		}).spread( function(pokemon, created) {
  			console.log(pokemon.get());
  			res.redirect('/pokemon');
  			})
});


router.get('/:id', (req, res) => {
	var findName = db.pokemon.findById(parseInt(req.params.id))
	.then((pokeName) => {
		var resultUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=151'+ pokeName.name.toLowerCase();
		request(resultUrl, function (error, response, body) {
			var pokemonData = JSON.parse(body);
			res.render('show', {pokemon: pokemonData});
      console.log(pokemonData.types[0].type.name)
		})
	});
});


router.delete('/', function(req, res) {
	db.pokemon.destroy({
  		where: {name: req.body.name}
		}).then( function(pokemon, deleted) {
  // do something when done deleting
  		res.redirect('/pokemon');
  	})
});

module.exports = router;