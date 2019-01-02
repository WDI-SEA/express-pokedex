var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var db = require('../models');
var parser = require('json-parser');


router.get('/:name', function(req, res){
	db.pokemon.find({
    where: { name: req.params.name }
  }).then(function(data) {
    request({
      url: 'http://pokeapi.co/api/v2/pokemon/' + data.name
    }, function(error, response, body) {
      var pokemon = JSON.parse(body);
      console.log(body);
      res.render('show', { pokemon: pokemon, name: req.params.name})
    });
  });
});




// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(function(pokemons){
  	console.log(pokemons)
  	res.render('favorites', {pokemon: pokemons})
  })

  // res.send('Render a page of favorites here');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
	// res.send(req.body);
	// var name = req.body.name;

  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({where: {name: req.body.name}}).then(function(back){
  	res.redirect('/pokemon');
 })
  
});

router.delete('/:name', function(req, res) {
  db.pokemon.destroy({
    where : {name: req.params.name}
  }).then(function(data) {

    res.send('delete');
  });
});


module.exports = router;
