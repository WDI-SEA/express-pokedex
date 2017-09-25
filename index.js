var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var app = express();

var pokeRoutes = require('./routes/pokemon');
var controllers = require('./controllers');
var pokemon = controllers.pokemon;

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=151';
    request(pokemonUrl, function(error, response, body) {
        if (error) {
            return res.send(error);
        }

        var result = JSON.parse(body).results;
        res.render('index', { pokemon: result });
    });
});

app.get('/getFavorites', function(req, res) {
    pokemon.getFavorites(db)
        .then(function(result) {
            res.send(result);
            var result = JSON.parse(body).results;
            res.render('favorite', { pokemon: result });
        })
        .catch(function(error) {
            res.send(error);
        });
});

// This is how we seperate our routes into seperate files
app.use('/pokemon', pokeRoutes);

var server = app.listen(process.env.PORT || 3000);

module.exports = server;