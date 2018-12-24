var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var db = require('../models');

// app.use(bodyParser.urlencoded({ extended: false }));

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(pokemons => {
    res.render('pokemon', { pokemons: pokemonObjectToTemplate(pokemons) });
  });
});

router.get('/:idx', function(req, res) {
  var queryName = req.params.idx;

  var pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${queryName}`;
  // Use request to call the API
  request(pokemonUrl, function(error, response, body) {
    // Use DB to get number of pokemon to generate image URL
    db.pokemon.find({ where: { name: queryName } }).then(function(pokemon) {
      res.render('show', { pokemon: parsePokemonAPIPokemon(body) });
    });
  });
});

router.delete('/:idx', function(req, res) {
  db.pokemon
    .destroy({
      where: { name: req.params.idx },
    })
    .then(() => {
      res.redirect('/pokemon');
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

function parsePokemonAPIPokemon(body) {
  var pokemonDescription = JSON.parse(body);
  return {
    abilities: pokemonDescription.abilities.map(
      ability => ability.ability.name
    ),
    name: pokemonDescription.name,
    number: pokemonDescription.order,
    image: createImgString(pokemonDescription.name, pokemonDescription.id),
    moves: pokemonDescription.moves.map(move => move.move.name),
    height: pokemonDescription.height,
    weight: pokemonDescription.weight,
  };
}

module.exports = router;
