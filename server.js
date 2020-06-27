require('dotenv').config();
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const rowdy = require('rowdy-logger');
const app = express();
const rowdyResults = rowdy.begin(app)
const port = process.env.PORT || 3000;

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// GET / - main index of site
app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=151';
  // Use request to call the API
  axios.get(pokemonUrl).then( function(apiResponse) {
    var pokemon = apiResponse.data.results;
    console.log(apiResponse.data.results)
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  })
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(port, function() {
  rowdyResults.print();
  console.log('...listening on', port );
});

module.exports = server;


// db.pokemon.create({
//   name: 'Pikachu'
// }).then(function(poke) {
//   console.log('Created: ', poke.name)
// })

// db.pokemon.findAll().then(function(poke) {
//   console.log('Found: ', poke.name)
// })