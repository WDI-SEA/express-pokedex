var express = require('express');
var router = express.Router();
var db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
	db.pokemon.findAll().then(function(data) {
	console.log("data", data);
    res.render('/pokemon/favorites.ejs', { pokemon: data });
 	});
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  pokemon.create(req.body)
  .then(function(){
  	res.redirect('/pokemon');
  });
});

// router.post('/:pokemon_id', function(req,res){
// 	pokemon.create({pokemonId: req.params.pokemon_id})
// 	.then(function(){
// 		res.redirect('/pokemon');
// 	})
// })

module.exports = router;
