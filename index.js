var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

app.get('/', function(req, res) {
  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    res.render('index', { pokemon: pokemon });
  });
});

app.get('/more/:nextPosition', function(req, res) {
  var offset = Number(req.params.nextPosition),
      limit = 20;

  if ((offset + 20) > 151) {
    limit = 20 - ((offset + 20) - 151);
  }
  request(pokemonUrl + '?limit=' + limit + '&offset=' + offset, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    res.render('index', { pokemon: pokemon });
  });
})

app.use('/pokemon', require('./controllers/pokemon'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
