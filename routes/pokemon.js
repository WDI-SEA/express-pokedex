var express = require('express');
const db = require("../models");

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
  console.log(req.body.name);

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

module.exports = router;
