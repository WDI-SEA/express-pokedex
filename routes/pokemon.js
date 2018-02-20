var express = require('express');
var router = express.Router();
var db = require('../models');
var sequelize = require('sequelize');
var pg = require('pg');
var hstore = require('pg-hstore');
var path = require('path');
var request = require('request');

// GET - return a page with favorited Pokemon
router.get('/', function(req,res) {
    // TODO: render favorites
    console.log("in the /PATH");
    //   // dataValues:
    //   //  { id: 35,
    //   //    name: 'caterpie',
    //   //    customName: 'caterpie',
    //   //    notes: 'notes',
    //   //    createdAt: 2018-02-18T20:42:49.581Z,
    //   //    updatedAt: 2018-02-18T20:42:49.581Z }
    db.pokemon.findAll().then(function(data){
      // console.log(data);
      res.render('pokemon/index', {pokemons:data});
    });

});

// GET /pokemon/:id
router.get('/:id', function(req,res){
  console.log("in the /:id PATH");
  var pokemonToRetrieve = parseInt(req.params.id);
  db.pokemon.find({
    where: {id:pokemonToRetrieve}
  }).then(function(data){
    res.render('pokemon/details', {pokemon:data});
  });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req,res) {
    console.log("in the /POST PATH");
    // query api for pokemon data
    // pokemon to search for
    var pokemon = req.body.name;
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + pokemon;
    console.log(pokemonUrl);
    request(pokemonUrl, function(error, response, body) {
        var pokeImage = JSON.parse(body).sprites.front_default;
        var pokeHeight = JSON.parse(body).height;
        var pokeWeight = JSON.parse(body).weight;

        db.pokemon.findOrCreate({
          where: { name:pokemon },
          defaults: { pokeImage:pokeImage, pokeHeight:pokeHeight, pokeWeight:pokeWeight}
        }).spread(function(pokemon, created) {
          // returns info about the pokemon if exists
          res.redirect('/pokemon');
        });
    });
});

// PUT route
router.put('/:id', function(req,res){
  console.log("in /PUT path.....!");
  console.log(req.body);

  var pokemonToUpdate = parseInt(req.params.id);
  db.pokemon.findById(pokemonToUpdate)
  .then(function(data){
    db.pokemon.update({
      customName:req.body.customName,
      notes:req.body.notes
    },{
      where: { id:pokemonToUpdate }
    }).then(function(data){
      console.log("successfully updated " + pokemonToUpdate);
      res.redirect('/pokemon');
    });
  });

});

// DELETE route
router.delete('/delete/:id', function(req,res){
  console.log('in DELETE path....!');
  var pokemonToDelete = parseInt(req.params.id);
  db.pokemon.findById(pokemonToDelete)
  .then(function(data){
    db.pokemon.destroy({
      where: {id:pokemonToDelete}
    })
    .then(function(data){
      console.log('deleted object: ' + data);
    });
  })
});

module.exports = router;
