var express = require('express');
var router = express.Router();
var db = require("../models");

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
	db.pokemon.findAll({ order: "name ASC" }).then(function(pokemons){
		res.render("pokemon/index", { pokemons: pokemons});
	});
});



// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  //res.send(req.body);
  db.pokemon.create({
  	name: req.body.name
  }).then(function(){
  	res.redirect("/pokemon");
  });
});

















module.exports = router;
