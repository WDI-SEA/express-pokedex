var db = require('../models');
var request = require('request');
var express = require('express');
var router = express.Router();



// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    db.pokemon.findAll().then(function(myFavorites) {
        res.render('favorites', { pokemon: myFavorites });
    }).catch(function(error) {
        res.status(404).send(error);
    });

});


// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    db.pokemon.create({
        name: req.body.name
    }).then(function() {
        res.status(303).redirect('/pokemon');
    }).catch(function(error) {
        res.status(404).send(error);
    });
});

router.get('/:id', function(req, res) {
    var names = req.params.id;
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + names;
    console.log(names);
    request(pokemonUrl, function(error, response, body) {
        var pokemon = JSON.parse(body);
        console.log(pokemon);
        res.render('pokeview', { pokemon: pokemon });
    });
});

module.exports = router;
