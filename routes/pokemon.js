var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    db.pokemon.findAll()
        .then(function(result) {
            res.render('mypokemon', { result: result });
        }).catch(function(error) {
            res.send('Error');
        });
});

router.get('/', function(req, res) {
    db.pokemon.findAll().then(function(pokemon) {
        res.render('index', { pokemon: pokemon });
    });
});

// POST - receive the name of a pokemon and add it to the database

router.post('/', function(req, res) {

    db.pokemon.create({
        name: req.body.name
    }).then(function() {
        res.redirect('/pokemon');
    });
});


router.get('/:name', function(req, res) {
    var pokeUrl = 'http://pokeapi.co/api/v2/pokemon/' + req.params.name;
    request(pokeUrl, function(err, response, body) {
        var info = JSON.parse(body);
        info.typesCommaSeperated = info.types.map(function(type) {
            return type.type.name;
        }).join(", ");
        info.abilitiesCommaSeperated = info.abilities.map(function(ability) {
            return ability.ability.name;
        }).join(", ");
        res.render('pokemon-info', { pokemon: info });
    });
});

module.exports = router;
