// global variables and requires
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

// set and use statements
app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));

app.use('/pokemon', require('./routes/pokemon'));

// routes
app.get('/', function(req, res) {
	var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
	var s = {
		limit: 5
	}
	request({
  		url: pokemonUrl,
  		qs: s
	}, function(error, response, body) {
    	var pokemon = JSON.parse(body).results;
    	res.render('index', { pokemon: pokemon });
  	});
});


// listen
var server = app.listen(process.env.PORT || 3000);

module.exports = server;
