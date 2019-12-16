require('dotenv').config(); //loads environment variables
const express = require('express');
const axios = require('axios'); //HTTP client
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 3000; //where to listen

app.use(require('morgan')('dev')); //HTTP request logger
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false })); //body parser
app.use(ejsLayouts);

// GET / - main index of site
app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
  // Use request to call the API
  axios.get(pokemonUrl)
    .then( function(apiResponse) {
      console.log(apiResponse.data.results);
    var pokemon = apiResponse.data.results;
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  })
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(port, function() {
  console.log('...listening on', port );
});

module.exports = server;
 