var express = require('express');
let db = require('../models');
var router = express.Router();
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  // res.send('Render a page of favorites here');
  db.pokemon.findAll()
  .then(pokemons => {
    res.render('pokemon/favorites', {pokemons})
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {name: req.body.name}
  }).then(newPokemon => {
    console.log(`Created`)
    res.redirect(`/pokemon`)
  })
});

router.get('/:id', (req, res) => {
  db.pokemon.findOne({
    where: {
      id: req.params.id
    }
  }).then((pokemon) => {
    var pokemonUrl = `http://pokeapi.co/api/v2/pokemon/` + `${pokemon.name.toLowerCase()}`;
    console.log(pokemonUrl)
    // Use request to call the API
    axios.get(pokemonUrl)
      .then(function(apiResponse) {
      var pokemon = apiResponse.data;
      res.render('pokemon/show', {pokemon: pokemon, id: req.params.id})
      console.log(pokemon)
      // res.render('index', { pokemon: pokemon.slice(0, 151) });
    })
  }).catch((error) => {
    console.log(error)
  })
})

// GET /pokemon/index.ejs

// router.get('/views/pokemon/index', (req, res) => {
//   db.pokemon.findAll()
//   .then((pokemon) => {
//     res.render('/pokemon/index', {pokemon: index})
//   }).catch((error) => {
//     res.status(400).render('.main/404')
//   })
// })

router.delete('/:id', (req, res) => {
  db.pokemon.destroy({
    where: {
      name: req.params.id
    }
  }).then(res.redirect('/pokemon'))
})

module.exports = router;
