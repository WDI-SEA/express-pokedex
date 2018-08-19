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

router.get("/:id", function(req, res) {
	db.pokemon.findById(req.params.id).then(function(foundPokemon){
		console.log("found Pokemon:", foundPokemon);
		res.render('pokemon/:id', foundPokemon);
	}).catch(function(error) {
		console.log("error:", error);
		res.render("pokemon/404");
	});
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  res.send(req.body);
});

router.delete("/:id", function(req, res){
	console.log(req.params.id);
	db.pokemon.destroy({
		where: {id: req.params.id}
	}).then(function(justDestroyed){
		console.log("deleted:", justDestroyed);
		res.send("successfully deleted");
	}).catch(function(error){
		console.log("error:", error);
		res.send("yikes");
	});
});


module.exports = router;
