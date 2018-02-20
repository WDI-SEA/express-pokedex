var db = require('./models');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

app.use(require('morgan')('dev')); // Replace with rowdy-logger
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

// Set a static directory
app.use(express.static('public'));

app.get('/', function(req, res) {
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=151';
    request(pokemonUrl, function(error, response, body) {
        var pokemon = JSON.parse(body).results;
        console.log(pokemon);
        res.render('index', { pokemon: pokemon });
    });
});

app.use('/pokemon', require('./controllers/pokemon'));

var server = null;
db.sequelize.sync()
    .then(function() {
        server = app.listen(3000);
    })
    .catch(function(err) {
        console.log(err);
    });

module.exports = server;
