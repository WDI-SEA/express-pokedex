var express = require('express');
var request = require("request");
var router = express.Router();
var db = require("../models");

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(pokemon) {
    res.render("pokemon", { pokemon: pokemon });
  });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // check for uniqueness (has the pokemon already been added to the database)
  db.pokemon.findOrCreate({ where: { name: req.body.name },
    defaults: { name: req.body.name } }).then(function(result) {
      // console.log(result[1]);
      res.redirect("/pokemon");
    });
});

// DELETE (via favorites page)
router.delete("/", function(req, res) {
  var pokemon_name = req.body.name;
  db.pokemon.destroy({
    where: {
      name: pokemon_name
    }
  }).then(function(result){
    res.redirect("/pokemon");
    // console.log("deleted", result)
  });
});


// GET /:name
// view: views/show.ejs
router.get('/:name', function(req, res) {
  var name = req.params.name
  var pokemonURL = 'http://pokeapi.co/api/v2/pokemon/' + name; // URL to specific pokemon

  request(pokemonURL, function(error, response, body) { // requesting API, it's in the form of a JSON
    // the first "level" of the JSON consists of
    // forms, abilities, stats, name, weight, moves, sprites, held_items, location_area_encounters,
    // height, is_default, species, id, order, game_indices, base_experience, types

    var pokemon = JSON.parse(body);
      // basic details: sprites, name, weight, height, id, types

    res.render('detail', { pokemon: pokemon });
  });
});

// DELETE (via pokemon's details page)
router.delete("/:name", function(req, res) {
  var pokemon_name = req.body.name;
  db.pokemon.destroy({
    where: {
      name: pokemon_name
    }
  }).then(function(name){
    res.redirect("/pokemon");
  });
});

module.exports = router;
