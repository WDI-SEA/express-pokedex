var express = require('express');
var router = express.Router();
const db = require('../models');
var request = require('request');


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function (pokemons) {
  res.render('pokemon/faves', {pokemons})
  });
});

router.post('/', function(req, res){
  db.pokemon.create({
    name: req.body.name
  }).then(function(){
    res.redirect('pokemon')
  });
});

router.get('/:id', function(req, res){
  db.pokemon.findById(req.params.id).then(function(pokemon){
    request('http://pokeapi.co/api/v2/pokemon/' + pokemon.name , function(error, response, body) {
      var info = JSON.parse(body)
      // res.json(info)
      res.render('pokemon/show', {info});
    })
  });
});

router.delete('/:id', function(req, res){
  db.pokemon.destroy({
    where: {id:req.params.id}
  }).then(function(){
    res.redirect('/pokemon')
  })
});
// TODO: Get all records from the DB and render to view
//POST /pokemon - receive the name of a pokemon and add it to the database
// TODO: Get form data and add a new record to DB
//sometimes do not use full crud routes

module.exports = router;
