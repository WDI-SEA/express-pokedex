var express = require('express');
var router = express.Router();
var db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
	console.log("getting pokemon");
	db.pokemon.findAll().then(function(pokemon){
		console.log('pokemon/index');
		res.render('pokemon/index', {pokemon: pokemon});
	}).catch(function(err){
		console.log('oops', err); 
		res.send('No DICE!');
	});
});


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  res.send(req.body);
});

module.exports = router;

router.delete("/:id", function(req, res){
	console.log(req.params.id);
	db.pokemon.destroy({
		where: {id: req.params.id}
	}).then(function(deletedPokemon){
		console.log("deleted:", deletedPokemon);
		res.send("successfully deleted");
	}).catch(function(error){
		console.log("error:", error);
		res.send("did not delete");
	});
});
