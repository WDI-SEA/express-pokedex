var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    db.pokemon.findAll()
        .then(function(result) {
            res.render('my0pokemon', { result: result });
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
    var newPokemon = req.body;

    db.pokemon.create({ newPokemon })
        .then(function() {
            res.status(404).redirect('/pokemon');
        })
});


router.get('/:id ', function(req, res) {
    var idOfPokemon = req.params.id;

    request('http://pokeapi.co/api/v2/pokemon/' + idOfPokemon, function(err, response, body) {
        var info = JSON.parse(body)
        console.log(info);
        res.render('pokemon-info', { info: info });
    });
});


module.exports = router;
