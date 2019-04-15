require('dotenv').config();
var express = require('express');
var request = require('request');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var db = require('./models');

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

let upperBound = 251;

// GET / - main index of site
app.get('/', function(req, res) {
  let pokemonUrl = `http://pokeapi.co/api/v2/pokemon?limit=${upperBound}`;
  // Use request to call the API
  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    res.render('index', { pokemon: pokemon.slice(0, upperBound) });
  });
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(process.env.PORT || 3007, () => {
  console.log("listening");
});

module.exports = server;
