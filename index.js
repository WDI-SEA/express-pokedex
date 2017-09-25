var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var app = express();
// var route = require('./routes/pokemon.js');

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
// ejs is the view engine
app.use(bodyParser.urlencoded({ extended: false }));
// allows you to take form data and allows you to use it
app.use(ejsLayouts);

app.get('/', function(req, res) {
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=151';
// get route for our home
    request(pokemonUrl, function(error, response, body) {
        var pokemon = JSON.parse(body).results;
        // this is what we're getting back from the API
        res.render('index', { pokemon:pokemon });
        // the 1st pokemon is just a variable declartions
        // second pokemon is the actual data
    });
});
// This is how we seperate our routes into seperate files
app.use('/pokemon', require('./routes/pokemon'));
// for all of our routes w/ /pokemon they reuqire
// using the pokemon.js folder
var server = app.listen(process.env.PORT || 3000);

module.exports = server;
