var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var db = require("./models");

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

app.get('/', function(req, res) {
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';

    request(pokemonUrl, function(error, response, body) {
        var pokemon = JSON.parse(body).results;
        res.render('index', { pokemon: pokemon });
    });
});


app.get('/pokemon', function(req, res) {
    db.pokemon.findAll().then(function(pokemon) {
        res.render('index', { pokemon: pokemon });
    });
});

app.post('/pokemon', function(req, res) {
    var newPokemon = req.body;

    db.pokemon.create({
        name: newPokemon.name,
    }).then(function(game) {
        res.status(404).redirect('/pokemon/');
    })
});

app.get('/pokemon/:id', function(req, res) {
    var idOfPokemon = req.params.id;

    db.pokemon.findOne({
        where: {
            id: idOfPokemon
        }
    }).then(function(pokemon) {
        if (pokemon) {
            res.render('pokemon-info', { pokemon: pokemon });
        } else {
            res.status(404).send("This particular Pokemon does not exist")
        }
    }).catch(function(error) {
        res.status(404).send(error);
    });
});

app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
