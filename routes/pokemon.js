var express = require('express');
var router = express.Router();
var db = require ('../models');
var request = require('request');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
    db.pokemon.findAll().then(function(result){
    	  res.render('favorites', {result: result});
    });
});


// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database
    db.pokemon.create({
    	name: req.body.name
    }).then(function(){
    	res.redirect('/pokemon');
    });
});


//GET - return a page with favorite pokemon's stats
router.get('/:name', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/'+ req.params.name;
  request(pokemonUrl, function(error, response, body) {
  	var pokemon = JSON.parse(body);
    res.render('stats', { pokemon: pokemon });
  });
});




// router.get('/:id', function(req, res){
// 	db.dailyplanet.findById(req.params.id).then(function(article){
// 		res.render('articles/show.ejs', {result: articles});
// 	})
// })

module.exports = router;
