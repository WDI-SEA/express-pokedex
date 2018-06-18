require('dotenv').config();
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var app = express();
var port = process.env.PORT || 2000;

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));

// GET / - main index of site
app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    res.render('index', { pokemon: pokemon });
  });
});



// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(process.env.PORT || 3000);
module.exports = server;
