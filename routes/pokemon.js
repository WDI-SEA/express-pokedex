var express = require('express');
var router = express.Router();
var db = require('../models/');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
  db.pokemon.findAll()
    .then(function(pokemons){
     // res.send(pokemons);
     res.render('pokemon/favourites.ejs', {pokemons:pokemons});
    });

  



});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database
    db.pokemon.create(req.body)
    .catch(function(err){
      res.status(500).render('error');
    });
 
});

module.exports = router;
