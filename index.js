var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
// var rowdy = require('rowdy-logger');
var app = express();

// var rowdyResults = rowdy.begin(app)

// ... apply your routes ...

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

app.get('/', function(req, res) {
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=151';

    request(pokemonUrl, function(error, response, body) {
        var pokemon = JSON.parse(body).results;
        res.render('index', { pokemon: pokemon });
    });
});

app.use('/pokemon', require('./routes/pokemon'));

// var server = app.listen(process.env.PORT || 3000);
var server = app.listen(process.env.PORT || 3000, function() {
    // rowdyResults.print();
});


module.exports = server;
