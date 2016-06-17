var express = require('express');
var router = express.Router();
var db = require('../models');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // grabbing all the favorites then storing them in a variable named favorites
  // then putting them on the favorites.ejs page
  db.pokemon.findAll().then(function(favorites){
    res.render('favorites.ejs', {pokemon: favorites}); // favorites is an array
  })

});
// POST - receive the name of a pokemon and add it to the database
// we're adding a favorite to the database
router.post('/', function(req, res) {
  db.pokemon.create({
    name: req.body.name     // req.body is form information from a form that has method='POST'
                            // req.query is form info from a form that has method="GET"
                            // req.params is when you have you /:name in your route definition
                            // we're using POST here because its transformative (it's changing the database). It's being put in a database
  }).then(function(newFavorite){
    res.redirect('/pokemon')
  })
});

module.exports = router;
