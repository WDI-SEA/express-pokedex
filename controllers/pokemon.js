var express = require('express');
var router = express.Router();
var db = require('../models');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(pokemon){
    res.render('pokemon.ejs', { pokemon: pokemon})
  });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create(req.body).then(function(){
    res.redirect('/pokemon');
  });
});

router.delete('/:name', function(req, res){
  db.pokemon.destroy({
    where: {
      name: req.params.name
    }
  }).then(function(){
    res.status(200).send('success');
  });
});

module.exports = router;
