var express = require('express');
var db      = require('../models');
var router  = express.Router();

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
 // res.send('Render a page of favorites here');
 db.pokemon.findAll().then(function(newPokemon) {
  res.render('pokemon/index.ejs', { favorites : newPokemon });
 })
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    db.pokemon.create({
    name: req.body.name
  }).then(function(newPokemon) {
    console.log(newPokemon.get());
    res.redirect('/pokemon');
  });
});

router.delete('/pokemon/:name', function(req, res) {
    db.pokemon.destroy({
        where: {
          name: req.body.name
        }
      }).then(function(newPokemon) {
        console.log('you\'re in');
        res.render('/pokemon');
      });
});

module.exports = router;
