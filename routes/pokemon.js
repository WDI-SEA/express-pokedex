var express = require('express');
const db = require("../models");
const axios = require("axios");

var router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll()
    .then(pokemon => {
      res.render("favorites/index", { pokemon: pokemon });
    }).catch(err => {
      res.send("Could not get users pokemon", err);
    });
});

router.get("/:name", (req, res) => {
  db.pokemon.findOne({
    where: {
      name: req.params.name
    }
  }).then(pokemon => {
    let pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${pokemon.name}/`;
    axios.get(pokemonUrl).then(response => {
      let result = response.data;
      res.render("favorites/show", { pokemon: result });
    }).catch(err => {
      res.send(`Could not get ${pokemon.name} from API`, err);
    });
  }).catch(err => {
    res.send(`Could not get ${req.params.name} from user's pokemon`, err);
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {

  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  }).then(([pokemon, created]) => {
    res.redirect("/pokemon");
  }).catch(err => {
    res.send(`Error: ${err}`);
  });
});

// DELETE /pokemon - Remove the name of a pokemon from your favorites in the database
router.delete("/:id", (req, res) => {
  db.pokemon.destroy({
    where: {
      id: req.params.id
    }
  }).then(numDeleted => {
    res.redirect("/pokemon");
  })
});

module.exports = router;
