var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
	db.pokemon.findAll().then(function(data) {
	console.log("data", data);
    res.render('pokemon/favorites.ejs', { pokemon: data });
 	});
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create(req.body).then(function(){
  	res.redirect('/pokemon');
  });
});


router.get('/:name', function(req, res){
	var pokeUrl = 'http://pokeapi.co/api/v2/pokemon/' + req.params.name;
	request(pokeUrl, function(err, response, body){
		if(err){
		console.log('error!', err);
		res.send('ERROR, CHECK YOUR LOGS');
		} else{
		var results = JSON.parse(body);
		res.render('pokemon/moreInfo', { results: results , query: req.body.userquery });
		}
	});
});


module.exports = router;
