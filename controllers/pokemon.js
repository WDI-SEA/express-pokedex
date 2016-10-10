var express = require('express');
var router = express.Router();
var db = require('../models');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll({
  }).then(function(result) {
  	res.render("pokemon", {favPokemon: result});
  })
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create({
  	name: req.body.name
  }).then(function(data) {
  	if(data) {
  		res.redirect("/pokemon");
  	} else {
  		res.send("Server error.");
  	}
  });
});

module.exports = router;
