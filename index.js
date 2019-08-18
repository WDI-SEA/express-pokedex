//required 
require('dotenv').config();
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
let methodOverride = require('method-override')
let db = require('./models')

// instance
const app = express();

// middleware
app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(methodOverride('_method'))
//app.use('/', express.static('static'))

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

// GET / - main index of site
app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=151';
  // Use request to call the API
  axios.get(pokemonUrl)
  .then( function(apiResponse) {
    var pokemon = apiResponse.data.results;
    console.log('pokemon : ', pokemon)
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  })
});

// Listen
const port = process.env.PORT || 3000;

var server = app.listen(port, function() {
  console.log('...listening on', port );
});

module.exports = server;
