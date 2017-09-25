//this is just like index.js but for all the /pokemon routes
//not in controller directory but this is the routing
var express = require('express');
var db = require("../models");
var request = require("request");
var router = express.Router(); //this just configured my routes
var path = require("path");

router.use(express.static(__dirname + '/public'));

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    //render favorites
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

//second attempt
router.get('/:name', function(req, res) {
    var pokeName = req.params.name;
    var pokeUrl = 'http://pokeapi.co/api/v2/pokemon/' + pokeName;
    console.log(pokeUrl);
    request({
      url: pokeUrl
    }, function(error, response, body) {
      var pokemon = JSON.parse(body);
      res.render('pokemonInfo', {
        pokemon: pokemon
      })
    })
});

router.delete("/:idx", function(req, res) {
  var deleteIndex = req.params.idx;
})

//this is where I'm exporting my /pokemon routes to index.js
module.exports = router;
