require('dotenv').config();
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override')
const app = express();

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

// GET / - main index of site
app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
  // Use request to call the API
  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    res.render('index', { pokemon: pokemon });
  });
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
