const express = require("express");
const db = require("../models");
const router = express.Router();
const axios = require('axios'); 

// GET /pokemon - return a page with favorited Pokemon
router.get("/", function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(function(pokemons) {
    res.render("pokemon/index", { pokemons: pokemons });
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post("/", function(req, res) {
  // TODO: Get form data and add a new record to DB
  // res.send(req.body);
  db.pokemon
    .create({
      name: req.body.name
    })
    .then(function(pokemon) {
      res.redirect("/pokemon");
    });
});

// Individual Pokemon
router.get("/:id", function(req, res) {
  var num = req.params.id;
  db.pokemon
    .findOne({
      where: {
        id: num
      }
    })
    .then(function(pokemon) {
      var pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
      axios.get(pokemonUrl).then(function(result) {
        var pokeInfo = result.data;
        res.render("pokemon/show", { pokemon: pokeInfo });
      });
    });
});

module.exports = router;
