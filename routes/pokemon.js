var express = require('express');
var router = express.Router();
var db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(pokemons => {
    res.render('pokemon', { pokemons: pokemonObjectToTemplate(pokemons) });
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon
    .findOrCreate({
      where: { name: req.body.name, number: req.body.number },
    })
    .spread((pokemon, created) => {
      console.log(req.body);
      db.pokemon.findAll().then(pokemons => {
        res.render('pokemon', { pokemons: pokemonObjectToTemplate(pokemons) });
      });
    });
});

// Helper Functions to create appropirate object to send to template

function createImgString(name, number) {
  let imgStringShort = number.toString();
  let imgString =
    imgStringShort.length === 1
      ? '00' + imgStringShort
      : imgStringShort.length === 2
      ? '0' + imgStringShort
      : imgStringShort;

  return `/img/${imgString}-${name}.svg`;
}

function pokemonObjectToTemplate(pokemons) {
  return pokemons.map(dbEntry => {
    return {
      name: dbEntry.name,
      number: dbEntry.number,
      image: createImgString(dbEntry.name, dbEntry.number),
    };
  });
}

module.exports = router;
