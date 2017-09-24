//this is just like index.js, but for all the '/pokemon routes'
var express = require('express');
var router = express.Router(); //this just configures my routes
var db = require('../models');
var request = require('request');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
    db.pokemon.findAll().then(function(result) {
    	res.render('favorites', {result: result})
    });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database
    db.pokemon.create({
    	name: req.body.name
    }).then(function() {
    	res.redirect('/pokemon');
    });
});

router.get('/:name', function(req, res) {
    var url = 'http://pokeapi.co/api/v2/pokemon/' + req.params.name;
    request({
        url: url
    }, function(error, response, body) {
        var result = JSON.parse(body);
        res.render('info', {result: result})
    })
})

router.delete('/:name', function(req, res) {
    db.pokemon.destroy({
        where: {name: req.params.name}
    }).then(function() {
        //
    })
})

module.exports = router;
