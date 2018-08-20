const express = require('express');
const request = require('request');

const db = require('../models');
const router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  db.favorites.findAll()
  .then( favorites => res.render('pokemon/index', { favorites }))
  .catch( (err) => {
    console.log('something happened', err);
    res.send('error');
  });
});

router.get('/:id', (req, res) => {
  db.favorites.find({ where: { id: req.params.id } })
  .then( (favorite) => {request(favorite.url, function(error, response, body) {
    let pokemon = JSON.parse(body);
    res.render('pokemon/show', {
      name: pokemon.name,
      sprite: pokemon.sprites.front_default,
      types: pokemon.types,
      abilities: pokemon.abilities,
      stats: pokemon.stats
      });
  })})
  .catch( (err) => {
    console.log('something happened', err);
    res.send('error');
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  db.favorites.findOrCreate({ where: { name: req.body.name } })
  .spread( (pokemon, created) => {
    res.redirect('/pokemon') })
  .catch( (err) => {
    console.log('that was unexpected');
    res.send("File not found");
  });
});

router.delete('/:id', (req, res) => {
  db.favorites.destroy( { where: { id: req.params.id } })
  .then( (destroyed) => {
    console.log('destroyed', destroyed);
    res.send('deleted'); })
  .catch( (err) => {
    console.log('err', err);
    res.send('fail');
  });
});

module.exports = router;
