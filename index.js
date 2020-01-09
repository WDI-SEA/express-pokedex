require('dotenv').config(); // loads local dev environment variables
const express = require('express');
const axios = require('axios'); // HTTP/HTTPS Client
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 3000; // Server Listen Port 3000

app.use(require('morgan')('dev')); // HTTP Request Logger
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false })); // Body Parser
app.use(ejsLayouts);
app.use('/', express.static('public'));

// GET / - main index of site
app.get('/', function(req, res) {
  var pokemonUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151';
  // Use request to call the API
  axios.get(pokemonUrl).then( function(apiResponse) {
    //console.log(apiResponse.data.results) // List of all pokemons returned from API
    var pokemon = apiResponse.data.results;
    res.render('index', { pokemon: pokemon.slice(0, 151) }); // Get first 151 Pokemon and send to index page
  })
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(port, function() {
  console.log('...listening on', port );
});

module.exports = server;
