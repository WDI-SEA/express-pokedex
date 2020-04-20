require('dotenv').config();
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 3000;

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// GET / - main index of site
app.get('/', function(req, res) {
  var pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=100&limit=151';
  // Use request to call the API
  axios.get(pokemonUrl).then( function(apiResponse) {
    var pokemon = apiResponse.data.results;
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  })
});



app.get('/det', (req, res) => {
  var pokemon = 'https://pokeapi.co/api/v2/pokemon/bulbasaur/';
  // Use request to call the API
  axios.get(pokemon).then( function(apiResponse) {
    var pokemon = apiResponse.data;
    res.render('practice', { pokemon: pokemon });
  })
})







// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(port, function() {
  console.log('...listening on', port );
});

module.exports = server;



