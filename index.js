var express = require('express');
var request = require('request');
var path = require('path');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var app = express();

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res) {
	var pokemon = null;
	var sprite = null;
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=151';
    var pokemonImageUrl = 'http://pokeapi.co/api/v2/pokemon-form?limit=151';
    request(pokemonUrl, function(error, response, body) {
        pokemon = JSON.parse(body).results;
        console.log(pokemon);
         res.render('index', { pokemon: pokemon});
    });
    //  request(pokemonImageUrl, function(error, response, body) {
    //     sprite = JSON.parse(body).sprites[3];      
    //     console.log(sprite);
    // });
});

// app.get('/', function(req, res) {
// 	var pokemonSpriteUrl = 'http://pokeapi.co/api/v2/pokemon-form?limit=151';
// 	request(pokemonSpriteUrl, function(error, response, body) {
//         var pokemon = JSON.parse(body).sprites.front_default;
//         res.render('index', { pokemonSprite: pokemon });
//     });
// });

app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
