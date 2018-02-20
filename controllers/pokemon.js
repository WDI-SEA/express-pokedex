var express = require('express');
var db = require('./../models');
var router = express.Router();
var bodyParser = require('body-parser');
var request = require('request');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // Renders favorites
    db.pokemon.findAll().then(function(data) {
        console.log('Query results' + data);
        res.render('pokemon/index', { favorites: data });
    });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // Add to database
    db.pokemon.create({
      name: req.body.name,
      nickname: req.body.nickname,
      level: req.body.level
    }).then(function(data) {
        res.redirect('/pokemon');
    });
});

// GET - return a page with more info on a particular Pokemon
router.get('/:name', function(req, res) {
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + req.params.name;
    request(pokemonUrl, function(error, response, body) {
        var pokemon = JSON.parse(body);
        res.render('pokemon/show', { pokemon: pokemon });
    });
});

// DELETE - delete a Pokemon from the favorites database
router.delete('/:id', function(req, res) {
    console.log('Hit the delete route');
    db.pokemon.destroy({
        where: { id: req.params.id }
    }).then(function() {
        res.send("success");
    })
    
});

module.exports = router;
