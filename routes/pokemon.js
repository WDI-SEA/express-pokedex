var express = require('express');
var router = express.Router();
// var rowdy = require('rowdy-logger');
var db = require('../models');

var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
// rowdy.begin(app);
router.get('/', function(req, res) {
    db.pokemon.findAll().then(function(pokemon) {
        res.render('favorites', { pokemon: pokemon });
    }).catch(function(error) {
        res.status(404).send(error);
    });
});

router.post('/', function(req, res) {
    var newPokemon = req.body;

    var value = {
        name: newPokemon.name
    };



    db.pokemon.create(value).then(function(pokemon) {
        res.status(303).redirect('/pokemon');

    }).catch(function(error) {
        res.status(404).send(error);
    });
});

router.get('/:id', function(req, res) {
    var name = req.params.id;
    var url = 'http://pokeapi.co/api/v2/pokemon/' + name;

    request(url, function(error, response, body) {
        var pokemon = JSON.parse(body);
        res.render('details', { pokemon: pokemon });
    });
});
module.exports = router;
