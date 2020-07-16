var express = require('express');
var router = express.Router();
var db = require('../models');
var pokemon = require('../models/pokemon');
var axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  let faves = []
    db.pokemon.findAll().then(pokemons => {
      pokemons.forEach(pokemon => {
        faves.push(pokemon.dataValues);
      })
    })
  res.send('pokemon.ejs', {pokemon: faves});
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  newFav = req.body.name
  db.pokemon.findOrCreate({
    where: {name: newFav}
  }).then(([pokemon, created]) => {
    res.redirect('/pokemon')
  }).catch(err => {
    console.log(err)
  })
});

router.get('/:id', (req, res) => {
  db.findOne({
    where: {
      id: req.params.id
    }
  }).then(pokemon =>{
    var pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
    axios.get(pokemonUrl).then(function(apiResponse) {
      let pokeData = apiResponse.data
      res.render('../views/show', {pokemonName: pokemon.name, pokeData: pokeData})
    })
  }).catch(err => {
    console.log(err)
  })
})



module.exports = router;
