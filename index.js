//requires express module and stores it in express variable
var express = require('express');
//requires request module and stores it in express variable
var request = require('request');
//bodyParser takes form data and makes it usable (for JSON)
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');

//express being called and stored in app variable
var app = express();

app.use(express.static(__dirname + '/public'));

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
//using ejs as view enngine
app.use(ejsLayouts);

//data is being retrieved from API. URL stored in pokemonURL variable
app.get('/', function(req, res) {
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=151';
    request(pokemonUrl, function(error, response, body) {
      //what we're getting back from API
    var pokemon = JSON.parse(body).results;
      //first pokemon is a key, the 2nd is the pokemon we are passing in from the JSON
    res.render('index', { pokemon: pokemon });
    });

});

app.delete('/pokemon/:idx', function(req, res) {
  var deleteIndex = req.params.idx;
  deleteIndex = parseInt(deleteIndex);
    pokemon.splice(deleteIndex,1);
  });

//this is how we separate our routes into separate files
app.use('/pokemon', require('./routes/pokemon'));

//express is listening to this port:
var server = app.listen(process.env.PORT || 3000);

//modules being exported into server that we have created.
module.exports = server;
