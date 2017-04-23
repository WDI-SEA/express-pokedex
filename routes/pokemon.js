var express = require('express');
var db = require("../models");
var request = require('request');
var router = express.Router();

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
    // res.send('Render a page of favorites here');
    db.pokemon.findAll().then(function(pokemons) {
        res.render('pokemon/index', { pokemons: pokemons });
    }).catch(function(error) {
        res.status(404).send(error);
    });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database
    // res.send(req.body);
    // console.log(req.body);
    var newPokemon = req.body;
    var value = {
        name: newPokemon.name
    };
    // db.pokemon.create(newPokemon).then(function(pokemon) {
    db.pokemon.create(value).then(function() {
        res.status(303).redirect('/pokemon'); // http://stackoverflow.com/a/4587262
    }).catch(function(error) {
        res.status(404).send(error);
    });
});

// GET - renders a page with information about the pokemon (the favorite with the corresponding row id)
router.get('/:id', function(req, res) {
    // Get the pokemon name that corresponds to the favorite pokemon row id
    var pokemonId = req.params.id;
    db.pokemon.findById(pokemonId).then(function(pokemon) {
        if (pokemon) { // pokemon exists
            var pokemonName = pokemon.name;

            // Get a specific pokemon's info by appending its name to the basic pokemon URL
            var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + pokemonName;

            // Request info about the specific pokemon by name
            request(pokemonUrl, function(error, response, body) {
                var pokemon = JSON.parse(body);
                res.render('pokemon/show', { pokemon: pokemon });
            });
        } else { // pokemon does not exist
            res.status(404).send("Doesn't exist, sad face.");
        }
    }).catch(function(error) {
        res.status(404).send(error);
    });
});

// Logic for deleting one game/pokemon, for reference, from hoten/cruddy-board-games-db
// router.delete('/game/:name', function(req, res) {
//     var nameOfTheGame = req.params.name;

//     db.game.destroy({
//         where: { name: nameOfTheGame }
//     }).then(function() {
//         res.status(204).redirect('/games'); // http://stackoverflow.com/a/17093684
//     });
// });

module.exports = router;
