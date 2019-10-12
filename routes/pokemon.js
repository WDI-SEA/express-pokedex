var express = require('express');
var router = express.Router();
var db = require('../models');
const axios = require('axios'); 
// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(function(faves) {
	  res.render('faves', { pokemon: faves })
	})
});


router.get('/:id', function(req,res){
  db.pokemon.findByPk(req.params.id)
  .then(function(result){
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + result.dataValues.name + '/';
    axios.get(pokemonUrl).then( function(response) {
    res.render('show', {result: result, pokemon: response.data})
  })
})
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
	  where: { name: req.body.name }
	}).then(function(fave) {
		res.redirect('pokemon')
	})
});

module.exports = router;
