var express = require('express');
var router = express.Router();
var db = require("../models");
var path = require('path');
var request = require('request');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(pokemon) {
    res.render('pokemon/index', {pokemon: pokemon});
  });
});

//GET - return details of specific pokemon
router.get('/info/:name', function(req, res){
  var pokemon = req.params.name;
  var info = "http://pokeapi.co/api/v2/pokemon/" +pokemon;
  request(info, function(error, response, body){
    var height = JSON.parse(body).height * 10;
    var weight = JSON.parse(body).weight / 10;
    var sprites = JSON.parse(body).sprites;
  //  var abilities = JSON.parse(body).abilities;
    var stats = JSON.parse(body).stats;
    console.log(stats);
    console.log(stats[0]['stat']['name']);
    console.log(stats[0]['base_stat'])
    res.render('info', {pokemon: pokemon});
  });
});
//, height: height, weight: weight, sprites: sprites, abilities: abilities, stats: stats

// POST - receive the name of a pokemon and add it to the database
// router.post('/', function(req, res) {
// //  console.log(req.body.name);
//   //console.log(req.body.abilities);
//   db.pokemon.create(req.body).then(function(pokemon){
//     console.log("pokemon added to db favorites:", req.body.name);
//     res.redirect("/");
//   });
// });
router.post('/', function(req, res) {
  console.log(req.body.name);
    db.pokemon.findOrCreate({
      where: {
        name: req.body.name
      }
    }).then(function(data) {
      res.redirect('/pokemon');
    })
});

//DELETE - delete existing pokemon from favorites
router.delete("/:id", function(req, res){
  var deletePokemon = req.params.id;
  db.pokemon.destroy({
    where: { id: deletePokemon }
  }).then(function(){
    res.send("pokemon deleted");
  });
});

module.exports = router;
