var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public/'))

//setting up root directory
app.get('/', function(req, res) {
  //setting up pokemon api
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=151';

  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    res.render('index.ejs', { pokemons: pokemon });
  });
});


//declaring routes
app.use('/pokemon', require('./routes/pokemon.js'));
app.use('/favorites', require('./routes/favorites.js'));

//set up listener port
var server = app.listen(process.env.PORT || 3000);

module.exports = server;