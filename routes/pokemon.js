var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(function(foundPokemon){
  	res.render('../views/results', { pokemons: foundPokemon })
  })
  .catch(function(error){
  	console.log('Error Message', error);
  	res.send('Error, check your logs');
  })
});

// render more info on the pokemon selected
router.get('/:name', function(req, res) {
  var pokemonURL = 'http://pokeapi.co/api/v2/pokemon/' + req.params.name;
  request(pokemonURL, function(error, response, body){
    var myPokemon = JSON.parse(body);
    var pokemonAbilities = JSON.parse(body).abilities;
    var pokeMoves = JSON.parse(body).moves;
      if(error){
        console.log('Error! Check your logs', error);
      }
      else {
        res.render('../views/show', { pokemon: myPokemon, abilties: pokemonAbilities, moves: pokeMoves })
      }
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create({
  	name: req.body.name
  })
  .then(function(data){
  	console.log(req.body.name, ' has been added to your favorites');
  	res.redirect('/pokemon');
  })
  .catch(function(error){
	console.log('There\'s been an error', error);
  })
});

// delete route
router.delete('/:name', function(req, res){
  db.pokemon.destroy({
    where: { name: req.params.name }
  })
  .then(function(){
    console.log(req.params.name, 'has been deleted from your favorites');
    res.redirect('/pokemon');
  })
  .catch(function(error){
    console.log('There\'s been an error! Check your logs', error);
  })
})

module.exports = router;


