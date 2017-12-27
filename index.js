var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

// For images, front end JS, CSS, etc:
app.use(express.static(__dirname + '/public/'));

app.get('/', function(req, res) {

	// Pull a random pokemon from the API (of 151 pokemon so we can "catch" them
	var pokemonRandom = Math.floor(Math.random() * 151) + 1;
	// To do: needs to be a number not in the database

    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + pokemonRandom;

    console.log(pokemonUrl);

    request(pokemonUrl, function(error, response, body) {

    //Pulls the stats we want out of the API for the one randomly selected pokemon
   	var pokeStats = {
   		pokemonapi_id: JSON.parse(body).id,
	    name: JSON.parse(body).name,
	    imagesrc: JSON.parse(body).sprites.front_shiny,
	    height: JSON.parse(body).height,
	    weight: JSON.parse(body).weight,
	    experience: JSON.parse(body).base_experience
	 }

	res.render('index', { pokemon: pokeStats });

    });
});

app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;

