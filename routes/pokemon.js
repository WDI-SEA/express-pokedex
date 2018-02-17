var express = require('express');
var router = express.Router();
var db = require("../models");
// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // res.render('pokemon', {pokemon:{name:req.body.name,index:req.body.url}});
    db.fav_pokemon.findAll().then(function(favPokemon) {
        res.render('pokemon', {
            results: favPokemon
        });
    });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database
    var n = req.body.url;
    n = parseInt(n.replace("https://pokeapi.co/api/v2/pokemon/",'').replace("/",""));
    req.body.url = n;
    //check db for existing items:
    db.fav_pokemon.findAll().then(function(favPokemon) {
    	i=true;
    	favPokemon.forEach(function(item){
    		if(n==item.index || req.body.name ==item.name){
    			i =  false;
    			return false;
    		}else{
    			i=true;
    		}
    	});
    	if(i===true){
        db.fav_pokemon.create({
            name: req.body.name,
            index: req.body.url
        }).then(function(ceatedItem) {
            res.redirect("/pokemon/"); //redirects to favorites
        }).catch(function(err) {
            res.send("error");
        });
    }else{
    	res.send("was already in db");
    }
    });
});
router.delete("/",function(req,res){
	console.log("REQUEST",req);
	db.fav_pokemon.destroy({
		where:{name: req.body.name}
	}).then(function(deleted){
		console.log("delted",deleted);
		res.send("success");
	}).catch(function(err){
		console.log("an error happened",err);
		res.send("fail");
	});
});
module.exports = router;