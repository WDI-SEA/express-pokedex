var express = require('express');
var router = express.Router();
var db = require("../models");
var request = require("request");
var ejsLayouts = require("express-ejs-Layouts");
var bodyParser = require("body-parser");

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
	db.favorite.findAll().then(function(favorite) {
		res.render("./pokemon/show", {favorite:favorite});
	});
});

router.get("/:id", function(req, res){
	db.favorite.findById(req.params.id).then(function(favorite){
		if(favorite){
			var pokemonUrl = "http://pokeapi.co/api/v2/pokemon/"+favorite.name+"/";
			request(pokemonUrl, function(error,response,body){
				var pokemon = JSON.parse(body);
				res.render("./pokemon/favorite", {favorite:favorite, pokemon:pokemon});
			});
		}
		else{
			res.status(404).send("Check the if statment");
		}
	}).catch(function(err){
		res.status(500).send("Error in the request")
	});
});
// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    db.favorite.create(req.body).then(function(createArticle){
    	res.redirect("/pokemon");
    }).catch(function(err){
    	res.send("Ohnoes", err);
    })
});
//DELETE route to delete pokemon from db and from favorites page
router.delete("/:id", function(req, res){
	console.log("delete route ID =", req.params.id);
	db.favorite.destroy({
		where: {id: req.params.id}
	}).then(function(deleted){
		console.log("deleted = ", deleted);
		res.send("success");
	}).catch(function(err){
		console.log("error happend", err);
		res.sen("fail");
	});
});


module.exports = router;
