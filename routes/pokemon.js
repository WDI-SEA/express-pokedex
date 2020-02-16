require('dotenv').config();
var express = require('express');
var router = express.Router();
const db = require('../models');
const axios = require('axios'); 


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // Get all records from the DB and render to view
  db.pokemon.findAll().then(function(pokemons) {
    // pokemons.forEach(pokemon => console.log('Found: ', pokemon.name));
    res.render('pokemon/index', { pokemons : pokemons });
  })
  .catch(err => res.send('Error'));
  // res.send('Render a page of favorites here');
});

// POST /pokemon - receive the name, nickname, and level of a pokemon and add it to the database
router.post('/', function(req, res) {
  // Get form data and add a new record to DB
  // console.log(`req.body.name`);
  db.pokemon.findOrCreate({
    where: {
        nickname: req.body.nickname
    },
    defaults: {
        name: req.body.name,
        nickname: req.body.nickname,
        level: req.body.level
    }
  }).then(function([pokemon, created]) {
    // console.log(`Successfully added pokemon to favorites`);
    res.redirect('/pokemon');
  }).catch(err => res.send('Error'));
  // res.send(req.body);
});

// GET /pokemon/:name - shows info on individual pokemon at :name
router.get('/my/:name', (req, res) => {
  var name = req.params.name;
  // console.log(pokemonData);
  res.render('pokemon/form', { pokemon: name });
  // res.send('SHOWING PAGE for adding my pokemon at ID ' + req.params.name);
})

// GET /pokemon/:name - shows info on individual pokemon at :name
router.get('/:name', (req, res) => {
  var pokeName = req.params.name;
  // console.log(pokeName);
  axios.get(`${process.env.POKE_API}${pokeName}`).then( function(apiResponse) {
    var pokemonData = apiResponse.data;
    // console.log(pokemonData);
    res.render('pokemon/show', { pokemon: pokemonData });
  }).catch(err => res.send('Error'));
  // res.send('SHOWING PAGE for pokemon at ID ' + req.params.id);
})

// DELETE from Favorites
router.delete('/:nickname', (req, res) => {
  // console.log(`Deleting pokemon: ${req.params.nickname}`);
  // delete from DB
  db.pokemon.destroy({
    where: {
        nickname: req.params.nickname
    }
  }).then(function() {
    res.redirect('/pokemon');
    // redirect to favorites page
  });
  // res.send('SHOULD BE DELETING FROM FAVORITES');
});

module.exports = router;
