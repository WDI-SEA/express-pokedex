var express = require('express');
var router = express.Router();
var db = require('../models')
var axios = require('axios');

router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(pokemon) {
    res.render('pokemon/favorites', {pokemon}); 
  });
});

//POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create({
    name: req.body.name
  }).then(function() {
    res.redirect('pokemon');
  })
});

//GET /pokemon/:id - gets one pokemon id from db
// and uses it to look up details about that one pokemon // from my db not from api 
router.get('/:id', function(req, res){
  db.pokemon.findByPk(req.params.id).then(function(pokemon){
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + pokemon.name + '/';
    axios.get(pokemonUrl).then(function(apiResponse) {
      var pokemon = apiResponse.data;
      res.render('pokemon/show', { pokemon, id: parseInt(req.params.id) });
    });
  });
});

router.delete('/:id', function(req, res) {
  db.pokemon.destroy({
    where: {id: parseInt(req.params.id)}
  }).then(function(pokemon){

    res.redirect('/pokemon');
  });   
})

module.exports = router;
