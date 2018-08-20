// All dependencies
require('dotenv').config();
const bodyParser = require('body-parser');
const ejsLayouts = require('express-ejs-layouts');
const express = require('express');
const request = require('request');

// Global var
const app = express();

// Sets and uses
app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public/'));

// --- ROUTES ---
app.use('/pokemon', require('./routes/pokemon'));

// GET / - main index of site
app.get('/', (req, res) => {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
  // Use request to call the API
  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    res.render('index', { pokemon });
  });
});

var server = app.listen(process.env.PORT || 3000, () => {
  console.log('You\'re listening to the smooth sounds of port 3000 in the morning');
});

module.exports = server;
