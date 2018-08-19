var db = require('../models');
var express = require('express');
var router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
	console.log("catch 'em");
	db.pokemon.findAll().then(function(pokemon){
		console.log('pokemon/index');
	res.render('pokemon/index', {pokemon: pokemon});
	}).catch(function(err){
		console.log('oops', err);
		res.send('違うですよ！ ポケモン がいない');
	});
  // TODO: Get all records from the DB and render to view

});

router.post('/', function(req, res){
	db.pokemon.create(req.body).then(function(newPokemon){
		console.log('caught pokemon:', newPokemon);
		res.redirect('/pokemon');
	}).catch(function(err){
		res.send('見つけなかった...');
	})
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  res.send(req.body);
});



module.exports = router;
