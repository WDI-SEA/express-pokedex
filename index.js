var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=20';

        // get request to pokemon api (20 results due to resource limits)
  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    res.render('index', { pokemon: pokemon });
  });
});
          // route to favorites page
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
