var express = require('express');
var router = express.Router();
var db = require('../models');
var ejsLayouts = require("express-ejs-layouts");
var request = require('request');

// ********************************START OF ROUTES*********************************
//router lets you define the pages in your pokemon.js file
//so you can elimnate writing routes in the index.js file
// ********************************GET /FAVORITE*********************************
// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    db.favorite.findAll().then(function(pokemon) {
        res.render('favorite-index', { pokemon: pokemon });
    }).catch(function(error) {
        res.status(404).send(error);
    });
    // res.send('Render a page of favorites here');
});

// ********************************POST /FAVORITE**************************************
// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    var addedPokemon = req.body;

    console.log(addedPokemon);
    //1.Where is the table?
    //2.What are we doing to table?
    //3.What should happen when function is done running?.then
    db.favorite.create(addedPokemon).then(function(pokemon) {
        res.status(303).redirect('/pokemon/' + pokemon.name);
    }).catch(function(error) {
        res.status(404).send(error); //4.What if the database fails?
    });
});

// ********************************SHOW /FAVORITE/:NAME*********************************
router.get('/:name', function(req, res) {
    var nameOfThePokemon = req.params.name;
    var infoPokemon = req.body;

    var showPokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + nameOfThePokemon.toLowerCase();
    console.log(showPokemonUrl);
    //Pokemon Template
    request(showPokemonUrl, function(error, response, body) {
        var pokemon = JSON.parse(body); //accesing pokemon api
        console.log(pokemon);
        res.render('favorite-show', { pokemon: pokemon }); // tempale and the data{object: value}
    });
});

// ********************************END OF ROUTES*********************************
module.exports = router;
















// -------------------------------------END ROUTES---------------------------------
