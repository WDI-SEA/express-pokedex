require('dotenv').config();
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));

// GET / - main index of site
app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=151';
  // Use request to call the API
  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    res.render('index', { pokemon: pokemon });
  });
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

// helper function to prettify data returns
app.locals.titleCase = function(str) {
  var splitStr = str.split("");
  // pretty sure there aren't any Mc's, Mac's or De's in the pokemon dataset
  splitStr[0] = splitStr[0].toUpperCase(); 
  return splitStr.join("");
}

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
