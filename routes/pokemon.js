var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');
var bodyParser = require('body-parser');

router.get('/pokemon', function(req, res) {
		db.pokemon.findAll().then(function(data) {
			res.render('pokemon', {pokemon: data});
	});
})

//add a fav pokemon by clicking on the 'add to fav' button
router.post('/pokemon', function(req, res) {
	db.pokemon.create({
		name: req.body.name
	}).then(function(data) {
		res.redirect('/pokemon');
	})
})

router.delete('/pokemon/:name/destroy', function(req, res) {
	console.log('in delete route');
	db.pokemon.destroy({
		where: {name: req.params.name}
	}).then(function(data) {
		res.send('success');
	})
})

router.get('/pokemon/:id', function(req,res) { // to your results
   var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + req.params.id;
   console.log(pokemonUrl);
   request(pokemonUrl, function(error, response, body) {
     if (!error && response.statusCode === 200) {
       var dataObj = JSON.parse(body);
       res.render('details', {pokemon: dataObj}); // change index to whatever your ejs file is called
     }
   })
 });

router.get('/pokemon', function(req, res) {
		db.pokemon.findAll().then(function(data) {
			res.render('pokemon', {pokemon: data});
	});
})

router.get('/', function(req, res) {
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';

    request(pokemonUrl, function(error, response, body) {
        var pokemon = JSON.parse(body).results;
        res.render('index', { pokemon: pokemon });
    });
});


module.exports = router;
