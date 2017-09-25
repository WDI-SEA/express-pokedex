//this is just like index.js but for all the /pokemon routes
//not in controller directory but this is the routing
var express = require('express');
var db = require("../models");
var router = express.Router(); //this just configured my routes

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
    db.pokemon.findAll()
    .then(function(result) {
        res.render("pokemon", { result: result });
    }).catch(function(error) {
        res.send("err");
    });
});

router.get('/', function(req, res) {
    db.pokemon.findAll().then(function(pokemon) {
        res.render('index', {pokemon: pokemon});
    });
});

router.post('/', function(req, res) {
    db.pokemon.create({
        name: req.body.name
    }).then(function() {
        res.redirect('/pokemon');
    });
});

//this is where I'm exporting my /pokemon routes to index.js
module.exports = router;
