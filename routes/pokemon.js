var express = require('express');
const db = require("./")
var router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
    .then(pokemon => {
      res.json(pokemon);
    }).catch(err => {
      res.send(`Error: ${err}`);
    });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {
      pokemon: req.body.name
    }
  }).then(([pokemon, created]) => {
    res.redirect(`/pokemon/${pokemon.id}`);
  }).catch(err => {
    res.send(`Error: ${err}`);
  });
});

module.exports = router;
