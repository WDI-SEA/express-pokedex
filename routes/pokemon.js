var express = require('express');
var router = express.Router();
const ejsLayouts = require('express-ejs-layouts');
// const axios= require('axios')
const db = require('../models');

const pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';

//ROUTES

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll()
  .then(function(foundPokemon){
    // res.send(` 🦊 ${foundPokemon}`)
    res.render('faves', { faves: foundPokemon })
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  // res.send(req.body) // check if post route works and verify's what req.body returns
  db.pokemon.findOrCreate({
    where:{
      name: req.body.name
    },
    defaults: {
      name: req.body.name
    }
  }).then(function([pokemon, created]){
    console.log(` 🦁🌺 ${pokemon.name} is ${created ? 'now in my favorites' : 'Already a favorite'} 🐯`)
    res.redirect('/pokemon')
  })
})


//How we can export this server to other servers 
module.exports = router;

