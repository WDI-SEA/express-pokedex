var express = require('express');
var db = require("../models");
var request = require('request');
var router = express.Router();

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
    db.pokemon.findAll().then(function(pokemons) {
        res.render('pokemon/index', { pokemons: pokemons });
    }).catch(function(error) {
        res.status(404).send(error);
    });
    // res.send('Render a page of favorites here');
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database
    // res.send(req.body);
    // console.log(req.body);
    var newPokemon = req.body;
    db.pokemon.create(newPokemon).then(function() {
        res.redirect('/pokemon');
    }).catch(function(error) {
        res.status(404).send(error);
    });
});

// GET - renders a page with information about the pokemon (the favorite with the corresponding row id)
router.get('/:id', function(req, res) {
    // Get the pokemon name that corresponds to the favorite pokemon row id
    var pokemonId = req.params.id;
    db.pokemon.findById(pokemonId).then(function(pokemon) {
        var pokemonName = pokemon.name;

        // Get a specific pokemon's info by appending its name to the basic pokemon URL
        var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + pokemonName;

        // Request info about the specific pokemon by name
        request(pokemonUrl, function(error, response, body) {
            var pokemon = JSON.parse(body);
            res.render('pokemon/show', { pokemon: pokemon });
        });
    }).catch(function(error) {
        res.status(404).send(error);
    });
});

module.exports = router;
