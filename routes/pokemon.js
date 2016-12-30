var express = require('express');
var router = express.Router();
var db = require("../models");

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(pokemon) {
    res.render("pokemon.ejs", { pokemon: pokemon });
  });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // check for uniqueness (has the pokemon already been added to the database)
  db.pokemon.findOrCreate({ where: { name: req.body.name },
    defaults: { name: req.body.name } }).then(function(result) {
      console.log(result[1]);
      res.redirect("/pokemon");
    });
});

module.exports = router;
