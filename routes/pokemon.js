var express = require('express');
var router = express.Router();
var db = require('../models/');
var request = require('request');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
  db.pokemon.findAll()
    .then(function(pokemons){
     // res.send(pokemons);
     res.render('pokemon/favourites.ejs', {pokemons:pokemons});
    });

});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database
    db.pokemon.create(req.body)
    .catch(function(err){
      res.status(500).render('error');
    });
    
});

// GET a specific pokemon and display more data about it. 
router.get('/:id', function(req, res,next){
  var detailsUrl = 'https://pokeapi.co/api/v2/pokemon/';
  
  request(detailsUrl + req.params.id, function(err, response, body){
    var pokemon = JSON.parse(body);

    res.render('pokemon/singlePokeView', {pokemon:pokemon});
  });


});


router.delete('/:id', function(req, res){
  console.log(req.params.id);
  db.pokemon.destroy({where:{
    pokemonId: req.params.id

  }});

});

module.exports = router;
