var ejsLayouts = require('express-ejs-layouts');
var express = require('express');
var db = require('../models');
var request = require('request');
var path = require('path');
var methodOverride = require('method-override');
var router = express.Router(); 
var app = express();

app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(ejsLayouts);

router.get('/', function(req, res) {
	db.pokemon.findAll().then(function(pokemon) {
		res.render("pokemon", {pokemon: pokemon});
	});
});

//removing the / in front of pokemon
router.post('/', function(req, res) {
    db.pokemon.create(req.body).then(function(pokemon) {
    	res.redirect("/pokemon");
    });
});
//this might be the issue
router.get('/:name', function(req, res) {
	var pokemonUrl = "http://pokeapi.co/api/v2/pokemon/" + req.params.name;
	var speciesUrl = "http://pokeapi.co/api/v2/pokemon-species/" + req.params.name;
	request(pokemonUrl, function(error, response, body) {
		var dataObj = JSON.parse(body);
		request(speciesUrl, function(error2, response2, body2) {
			var dataObj2 = JSON.parse(body2);
				console.log(dataObj);
				console.log(dataObj2);
				res.render('./show', { pokemon: dataObj, species: dataObj2 });
			console.log("testing router");
		});
	});
});

router.delete('/:name', function(req, res) {
	db.pokemons.destroy({
		where: {name: req.params.name}
	}).then(function() {
		res.redirect("/pokemon");
	});
});

module.exports = router;
