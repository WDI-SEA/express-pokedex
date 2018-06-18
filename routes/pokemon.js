var express = require('express');
var request = require('request');
var db = require('../models');
var router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(function(data) {
  	res.render("pokemon/index", {pokemon: data});
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
	// TODO: Get form data and add a new record to DB
	var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + req.body.name;
	request(pokemonUrl, function(error, response, body) {
		var sprite = JSON.parse(body).sprites.front_default;
		db.pokemon.find({
			where: {name: req.body.name}
		}).then(function(data) {
			if (data === null) {
				db.pokemon.create({
					name: req.body.name,
					sprite: sprite
				}).then(function(data) {
					res.redirect("/pokemon");
				});
			} else {
				res.redirect('/pokemon');
			}
		});
	});
});

router.get("/:name", function(req, res) {
	var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + req.params.name;
	request(pokemonUrl, function(error, response, body) {
		pokemonData = JSON.parse(body);
		db.pokemon.find({
			where: {name: req.params.name}
		}).then(function(data) {
			if (data === null) {
				res.render("pokemon/404");
			} else {
				res.render('pokemon/show', {pokemon: pokemonData });
			};
		});
	});
});

router.post("/:name", function(req, res) {

})

router.delete("/:name", function(req, res) {
	db.pokemon.destroy({
		where: {name: req.params.name}
	}).then(function(data) {
		res.sendStatus(200);
	});
})

module.exports = router;
