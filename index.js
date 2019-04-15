require('dotenv').config();
var express = require('express');
var request = require('request');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// GET / - main index of site
app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
  // Use request to call the API
  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  });
});

  // Imports all routes from the pokemon routes file
  app.use('/pokemon', require('./routes/pokemon'));
  
  // Listen on PORT 3000
var server = app.listen(process.env.PORT || 3000);
console.log('I\'m listening to the smooth sounds of port 3000 in the morning. ☕')

module.exports = server;





