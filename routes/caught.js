var express = require('express');
var router = express.Router();
const request = require('request');

// DATABASE
const db = require("../models");
const sequelize = require('sequelize');

// GET /caught - return a page with successfully caught Pokemon
router.get('/', function(req, res) {
  db.caught_pokemon.findAll({
    attributes: [
      'nickname',
      'species',
      'level',
      'id',
    ],
  })
  .then(caughtPokemon => {
    res.render('caught/index', { pokemon: caughtPokemon });
  })
  .catch(err => {
    console.log(`Error: ${err}`);
    // ADD SOMETHING HERE
  })
});

// GET /caught/catch/species - Show form to add info about newly caught pokemon
router.get('/catch/:species', (req, res) => {
  res.render('caught/catch', { species: req.params.species })
});

// GET /caught/id - return a page with detailed info of one pokemon 
router.get('/:idx', function(req, res) {
  db.caught_pokemon.findOne({
    attributes: [
      'nickname',
      'species',
      'level',
      'id',
      'createdAt',
    ],
    where: {id: req.params.idx}
  })
  .then(selectedPokemon => {
    if (!selectedPokemon) {
      throw 'No pokemon with that id';
    }
    res.render('caught/show', { pokemon: selectedPokemon, back: req.query.back });
  })
  .catch(err => {
    console.log(`Error: ${err}`);
    res.render('error');
    // ADD SOMETHING HERE
  })
});



// POST /caught - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.caught_pokemon.findOrCreate({
    where: {
      nickname: req.body.nickname,
      species: req.body.species,
      level: req.body.level,
    },
  }).spread((caught, created) => {
    if (created) {
      console.log(`Caught ${caught.nickname}, a ${caught.species}`);
    }
    res.redirect('/caught');
  });
});

// GET /caught/edit/id - Edit/Delete form for fave pokemon
router.get('/edit/:idx', (req, res) => {
  db.caught_pokemon.findOne({
    attributes: [
      'id',
      'nickname',
      'species',
      'level',
    ],
    where: {id: req.params.idx}
  })
  .then(selectedPokemon => {
    if (!selectedPokemon) {
      throw 'No pokemon with that id';
    }
    res.render('caught/edit', { pokemon: selectedPokemon });
  })
  .catch(err => {
    console.log(`Error: ${err}`);
    res.render('error');
    // ADD SOMETHING HERE
  })
});


// POST/DELETE /caught/id - Remove pokemon from database
router.delete('/:idx', (req, res) => {
  db.caught_pokemon.destroy({
    where: {id: req.params.idx},
  })
  .then(destroyedPokemon => {
    res.redirect('/caught');
  })
  .catch(err => {
    console.log(`Error: ${err}`);
    res.render('error');
    // ADD SOMETHING HERE
  })
})

// POST/PUT /caught/id - Update pokemon info in database
router.put('/:idx', (req, res) => {
  db.caught_pokemon.update({
    nickname: req.body.nickname,
    level: req.body.level,
  }, {
    where: { id: req.params.idx },
  })
  .then(result => {
    res.redirect('/caught');
  })
  .catch(err => {
    console.log(`Error: ${err}`);
    res.render('error');
    // ADD SOMETHING HERE
  })
});



module.exports = router;
