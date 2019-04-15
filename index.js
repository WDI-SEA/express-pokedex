require('dotenv').config();
var express = require('express');
var request = require('request');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// GET / - main index of site
app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/?offset=0&limit=25';
  // Use request to call the API
  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    console.log(pokemon);
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  });
});

app.get('/1', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/?offset=26&limit=25';
  // Use request to call the API
  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    console.log(pokemon);
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  });
});

app.get('/2', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/?offset=51&limit=25';
  // Use request to call the API
  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    console.log(pokemon);
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  });
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
