var express = require('express');
var router = express.Router();
var db = require('../../models')
const axios = require("axios");



// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(function(pokemons) {
    // res.json(pokemons);
    // console.log(pokemons[0])
    res.render('favorites', {pokemon: pokemons});

  }).catch(err => {
    console.log(err)
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name,
      url: req.body.url
    }
  }).then(function([pokemon, created]) {
    res.redirect(`/pokemon`);
  }).catch(err => {
    console.log(err)
    res.send("ERROR")
  })
});

router.get("/:name", (req, res) => {
  db.pokemon.findOne({
    where: {
      name: req.params.name
    }
  }).then(function(pokemon) {
    axios.get(pokemon.url)
    .then(function(response) {
      console.log(response.data.types);
      onePokemon = {
        name: response.data.name,
        type: response.data.types,
        url: response.data.species.url
      }
      res.render('show', { onePokemon })

    })
    
  })
})

module.exports = router;
