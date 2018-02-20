var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var path = require('path');
var fs = require('fs');
var app = express();

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

// SET STATIC VIEWS
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'partials')));
// SET VIEWS
app.set('views', path.join(__dirname, 'views'));

// MAIN GET route
app.get('/', function(req, res) {

    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=10';

    request(pokemonUrl, function(error, response, body) {
        var pokemon = JSON.parse(body).results;
        res.render('index', { pokemon: pokemon });
    });
});



// POKEMON GET router
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
