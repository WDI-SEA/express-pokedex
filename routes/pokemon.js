var express = require('express');
var router = express.Router();
var db = require("../models");
// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // res.render('pokemon', {pokemon:{name:req.body.name,index:req.body.url}});
	db.fav_pokemon.findAll().then(function(favPokemon){
		res.render('pokemon',{results: favPokemon});
		
	});
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database
    var n = req.body.url;
	n=parseInt(n.substring(n.length-2,n.length-1));
	req.body.url=n;
   	db.fav_pokemon.create({name:req.body.name,index:req.body.url}).then(function(ceatedItem){
   		res.redirect("/pokemon/");//redirects to favorites
	}).catch(function(err){
		res.send("error");
	});
});

module.exports = router;
