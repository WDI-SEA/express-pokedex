var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require("../models");
var request = require('request');



// GET - return a page with favorited Pokemon
router.get("/", function(req, res) {
    db.pokemon.findAll().then(function(favorites){
    	res.render("favorites/show", {results: favorites});
    });
});

router.post("/", function(req, res) {
	db.pokemon.create(req.body).then(function(newFavorite){
		res.redirect("/pokemon")
	}).catch(function(err){
		res.send("error error!", err);
	});
});

//see page with each pokemon
router.get("/:id", function(req, res){
		var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + req.params.name;
    	request(pokemonUrl, function(error, response, body) {
        	var pokemon = JSON.parse(body).results;
        	res.render("favorites/poke", { pokemon: pokemon});
		});
});

// //see page with each pokemon
// router.get("/:id", function(req, res){
// 	db.pokemon.findById(req.params.id).then(function(favorite){
// 		res.render("favorites/poke", {result: favorite});
// 	});
// });


//delete pokemon from favorites page and db
router.delete("/:id", function(req, res){
 	db.pokemon.destroy({
		where:  {id: req.params.id}
	}).then(function(deleted){
		console.log("delete = ", deleted);
		res.send("success");
	}).catch(function(err){
		console.log("an error", err);
		res.send("fail");
	});
});

module.exports = router;
