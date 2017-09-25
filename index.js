var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
// var db = require(‘./models’);
var app = express();

// app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

app.get('/', function(req, res) {
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=50';

    request(pokemonUrl, function(error, response, body) {
        var pokemons = JSON.parse(body).results;
        res.render('index', { pokemons: pokemons });
    });
});

 //outside route file for js, only for pokemon. this how we separate our routes to separate files
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
