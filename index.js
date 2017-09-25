var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var path = require('path');

var app = express();

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');

app.use(ejsLayouts);

app.use(express.static(__dirname, + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=151';

    request(pokemonUrl, function(error, response, body) {
        var pokemon = JSON.parse(body).results;
        res.render('index', { pokemon: pokemon });
    });
});

//var pokemon might need to be defined as a global variable, testing with console log
// app.get('/pokemon/:id', function(req, res) {
// 	var pokemonFavorite = pokemon()[req.params.id];
// 	pokemonFavorite.id = req.params.id;
// 	res.render('favorites', { pokemon: pokemon });
// 	console.log('testing pokemon variable' + pokemon);
// });

//this is how we seperate our routes into seperate files
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
