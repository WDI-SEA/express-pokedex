require('dotenv').config();
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var db = require('./models');

app.use(express.static(__dirname + '/public'));
app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

// GET / - main index of site
app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=25';
  // Use request to call the API
  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    console.log(pokemon);
    res.render('index', { pokemon: pokemon });
  });
});

app.get('/index2', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=25&offset=25';
  // Use request to call the API
  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    console.log(pokemon);
    res.render('index', { pokemon: pokemon });
  });
});

app.get('/index3', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=25&offset=50';
  // Use request to call the API
  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    console.log(pokemon);
    res.render('index', { pokemon: pokemon });
  });
});

app.get('/index4', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=25&offset=75';
  // Use request to call the API
  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    console.log(pokemon);
    res.render('index', { pokemon: pokemon });
  });
});

app.get('/index5', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=25&offset=100';
  // Use request to call the API
  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    console.log(pokemon);
    res.render('index', { pokemon: pokemon });
  });
});

app.get('/index6', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=25&offset=125';
  // Use request to call the API
  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    console.log(pokemon);
    res.render('index', { pokemon: pokemon });
  });
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
