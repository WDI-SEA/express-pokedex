var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

app.get('/', function(req, res) {
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';

    request(pokemonUrl, function(error, response, body) {
        var pokemon = JSON.parse(body).results;
        //console.log(pokemon);
        res.render('index', { pokemon: pokemon });
    });
});



app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(process.env.PORT || 3000);


module.exports = server;
