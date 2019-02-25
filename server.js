require('dotenv').config();
const express = require('express');
const request = require('request');
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const app = express();

// middleware
app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false })); // lets you use form data
app.use(ejsLayouts);
app.use(express.static('public')); // tells renderer where static files live
app.use(methodOverride('_method'));

// GET / - main index of site
app.get('/', function(req, res) {
  let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=151';
  // Use request to call the API
  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    res.render('index', {pokemon});
  });
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
