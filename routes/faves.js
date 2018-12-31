var express = require('express');
var router = express.Router();
const request = require('request');

// DATABASE
const db = require("../models");

// GET /faves - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.fave_pokemon.findAll({
    attributes: ['id', 'species'],
  })
  .then(favePokemon => {
    res.render('faves/index', { faves: favePokemon });
  })
  .catch(err => {
    console.log(`Error: ${err}`);
    // ADD SOMETHING HERE
  })
});


// POST /faves - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.fave_pokemon.findOrCreate({
    where: {
      species: req.body.species,
    },
  }).spread((fave, created) => {
    if (created) {
      console.log(`Added ${fave.species} to favorites`);
    }
    res.redirect('/faves');
  });
});


// POST/DELETE /faves/id - Remove pokemon from database
router.delete('/:idx', (req, res) => {
  db.fave_pokemon.destroy({
    where: {id: req.params.idx},
  })
  .then(destroyedPokemon => {
    res.redirect('/faves');
  })
  .catch(err => {
    console.log(`Error: ${err}`);
    res.render('error');
    // ADD SOMETHING HERE
  })

})


module.exports = router;
