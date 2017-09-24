var express = require('express');
var router = express.Router();
var db = require('../models');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(pokemon) {
		res.render("./pokemon", {pokemon: pokemon});
	});
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create(req.body).then(function(pokemon) {
      res.redirect("/pokemon");
   });
});

router.delete("/pokemon", function(req,res){
 	db.pokemon.findById(req.params.id).then(function(pokemon) {
 		pokemon.destroy();
 	});
 });


module.exports = router;
