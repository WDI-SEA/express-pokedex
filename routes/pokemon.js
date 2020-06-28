var express = require('express');
const { render } = require('ejs');
var router = express.Router();
let db = require('../models');
const axios = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(pokemons => {
    res.render('favorites', {pokemons})
  })
});

router.get('/:id', (req, res) => {
  db.pokemon.findByPk(req.params.id)
  .then(pokemon => {
    let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
    axios.get((pokemonUrl)+pokemon.name)
    .then((apiResponse)=> {
      let pokeData = apiResponse.data
      res.render('../views/show', {pokemonName: pokemon.name, pokeData: pokeData})

    })
  })
  .catch((err) => {
    console.log('Err', err)
    res.send('404')
  })
})


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  let favPokemon = req.body.name
  db.pokemon.findOrCreate({
    where: {name:favPokemon}
  })
  .then(newPokemon => {
    console.log("CREATED")
    res.redirect('pokemon')
  })
  // TODO: Get form data and add a new record to DB
});

router.delete('/delete/:id', (req, res) => {
  db.pokemon.findByPk(req.params.id)
  .then(id => {
    console.log('Deleted', req.body.name)
    id.destroy();
  })
  .then(
    res.send('Pokemon Deleted, oh fuck!')
  )
})

router.delete('/delete/:id', (req,res) => {
  
})


module.exports = router;