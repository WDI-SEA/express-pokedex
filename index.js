var db = require('./models');

var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

app.get('/', function(req, res) {
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=21';

    request(pokemonUrl, function(error, response, body) {
        var pokemon = JSON.parse(body).results;
        console.log(pokemon);
        res.render('index', { pokemon: pokemon });
    });
});

app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;

route_info = app._router.stack // registered routes
    .filter(r => r.route) // take out all the middleware
    .map(r => r.route.path);

console.log(route_info)
