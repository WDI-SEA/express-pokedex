var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'pug');
app.set('view options', {
  layout: false // pug has default layout functionality
});

app.use(require('morgan')('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon-form?limit=151';
    request(pokemonUrl, function(error, response, body) {
        var pokemon = JSON.parse(body).results;
        console.log(pokemon.bulbasaur);
        res.render('index', { pokemon: pokemon });
    });
});

// this is how we separate our routes into separate files
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
