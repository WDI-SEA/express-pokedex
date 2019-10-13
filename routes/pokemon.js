var express = require('express');
var router = express.Router();
const ejsLayouts = require('express-ejs-layouts');
// const axios= require('axios');
// const db = require('./models');

const pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';

//ROUTES

// GET /pokemon - return a page with favorited Pokemon
router.get('/pokemon', function(req, res) {
  db.pokemon.findAll()
  .then(function(foundPokemon){
    res.send(` 🦊 ${foundPokemon}`)
  })
  // res.send('Render a page of favorites here');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/pokemon', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where:{
      id: req.body.id
    },
    defaults: {
        name: req.body.name
    }
  }).then(function([pokemon, created]){
    console.log(`${pokemon.name} is ${created ? 'Now in my favorites' : 'Already a favorite'}`)
    res.redirect('/pokemon')
  })
})


//How we can export this server to other servers 
module.exports = router;

