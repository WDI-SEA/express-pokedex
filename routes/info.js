var express = require('express');
var router = express.Router();
var db = require('../models')
var request = require('request');
var bodyParser = require('body-parser');


router.get('/:name', function(req, res) {
	var pokemonUrl = "http://pokeapi.co/api/v2/pokemon/" + req.params.name + "/";
	request(pokemonUrl, function(error, response, body) {
		// console.log(JSON.parse(body))
    	var pokemon = JSON.parse(body);
    	res.render('info', { pokemon: pokemon });

  });
});


module.exports = router;
