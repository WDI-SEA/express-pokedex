require('dotenv').config();
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 3000 || 5000;
let methodOverride = require('method-override');

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(methodOverride('_method')) 
// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

// GET / - main index of site
app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
  // Use request to call the API
  axios.get(pokemonUrl).then( function(apiResponse) {
    var pokemon = apiResponse.data.results;
    console.log('pokemon',pokemon)
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  })
});




var server = app.listen(port, function() {
  console.log('...listening on', port );
});

module.exports = server;


