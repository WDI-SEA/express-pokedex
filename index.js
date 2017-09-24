var express = require('express');
var request = require('request');
var db = require('./models');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
    var qs = { limit: 151};
    request({
      url: pokemonUrl,
      qs: qs
    }, function(error, response, body) {
        var pokemon = JSON.parse(body).results;
        res.render('index', { pokemon: pokemon });
    });
});


//this is how you separate routes into different files (aka all the app.get for /pokemon are in the routes/pokemon.js)
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
