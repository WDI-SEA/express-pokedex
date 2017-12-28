var express = require('express');
var router = express.Router();
var db = require('../models');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
    db.pokemon.findAll().then(function(pokemon){
      res.render('./index',{pokemon:pokemon});
  });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database
  db.pokemon.create(req.body).then(function(pokemon){
    res.redirect('/pokemon/')
  }).catch(function(err){
    res.send('nope', err);
  });
    // res.send(req.body);
});
router.get('/:id', function(req, res){
  db.pokemon.findById(req.params.id).then(function(poke){
    res.render('pokemon', {pokemon:poke});
  });
});

module.exports = router;
