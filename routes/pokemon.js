var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(pokemons){
    res.render('pokemon', {pokemons: pokemons})
  }).catch(function(error){
    res.status(404).send("Something is Wrong");
  });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create(req.body).then(function(){
    res.redirect('/pokemon')
  })
});

router.get('/:name', function(req, res){
  //route for more details
  var name = req.params.name;
  var pokeUrl = 'http://pokeapi.co/api/v2/pokemon/' + name;
    request(pokeUrl, function(error, response, body) {
       var moves = JSON.parse(body).moves;
       var sprites = JSON.parse(body).sprites;
       var stats = JSON.parse(body).stats;
       var height = JSON.parse(body).height;
       var weight = JSON.parse(body).weight;
       res.render('details', {
         pokemon:name,
         moves:moves,
         sprites:sprites,
         height:height,
         weight:weight,
         stats:stats
       });
     });
});

router.delete('/:name', function(req, res){
  //route for favorite delete
  db.pokemon.destroy({
    where: {name: req.params.name}
  }).then(function(){
    res.send({message: 'Successful delete'});
  });

});

module.exports = router;
