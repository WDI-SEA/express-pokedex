var express = require('express');
var request = require('request');
var router = express.Router();
var db = require('../models');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
    db.pokemon.findAll().then(function(pokemon){
      res.render('index', {pokemon: pokemon});
      // res.send('Render a page of favorites here');
    });
});


// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database
    db.pokemon.create(req.body).then(function(createdFavorite){
    // redirect to pokemon page
    res.redirect('/pokemon');
    // catch to display any error messages 
    }).catch(function(err){
      res.send('Uh oh!', err);
    });
});


// GET - renders a page with additional info on a specific/ fav'd pokemon
router.get('/:id', function(req, res){
  db.pokemon.findById(req.params.id).then(function(pokemon){
    res.render('show', {pokemon: pokemon});
  });
});




module.exports = router;
