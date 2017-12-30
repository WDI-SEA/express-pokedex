var express = require('express');
var request = require("request");
var bodyParser = require("body-parser");
var router = express.Router();
var db = require("../models");





// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    db.pokemon.findAll().then(function(pokemons) {
      res.render("pokemon/index", {pokemons: pokemons});
    });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    db.pokemon.create(req.body).then(function(createdPokemon) {
      res.redirect("pokemon/" + createdPokemon.id);
    }).catch(function(err) {
      res.send("uh oh!", err);
    });
});

//GET - return a page with individual pokemon
router.get("/:id", function(req, res) {
  db.pokemon.findById(req.params.id).then(function(pokemon) {
    request(pokemon.url, function(error, response, body) {
      var pokeMore = JSON.parse(body);
      console.log("this is the extra information: ", pokeMore);
      res.render("pokemon/pokedex-entry", {pokemon: pokeMore});
    });
  });
});

module.exports = router;