//this is index.js but for .pokemon routes

var express = require('express');
var router = express.Router();// this just configures my routes
var db = require('../models');
var request = require('request');
var bodyParser = require('body-parser');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    db.pokemon.findAll().then(function(pokemon){
      res.render('./favorite', {pokemon: pokemon});
    });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // res.send(req.body);
    db.pokemon.create({name: req.body.name}).then(function(pokemon) {
      res.redirect('/pokemon');
    });
});

router.get('/:name', function(req, res){
  var pokeInfo = 'http://pokeapi.co/api/v2/pokemon/' + req.params.name;
  request(pokeInfo, function(error, response, body){
        var result = JSON.parse(body);
        res.render('pokeInfo', {result: result})
  });
});

// router.delete('/:name', function(req, res){
//   db.pokemon.destroy({
//     where: {name: req.params.name}
//   })
// });

module.exports = router;
