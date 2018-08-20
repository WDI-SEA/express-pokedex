var express = require('express');
var router = express.Router();
var db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(function(pokemon){
    console.log('pokemonbs found:', pokemon);
    res.render('./index', {pokemon: pokemon});
  }).catch(function(err){
    console.log('oops', err);
    res.render('404');
  });
});

router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(function(pokemon){
    console.log('pokemonbs found:', pokemon);
    res.render('./info', {pokemon: pokemon});
  }).catch(function(err){
    console.log('oops', err);
    res.render('404');
  });
});

router.get('/', function(req, res) {
  db.pokemon.findById(req.params.id).then(function(foundPokemon){
    var name = foundPokemon.name;
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + name + '/';
  // Use request to call the API
  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body);
    res.render('pokemon/info', { pokemon: pokemon });
  });
});
});



// // POST /pokemon - receive the name of a pokemon and add it to the database
// router.post('/', function(req, res) {
//   // TODO: Get form data and add a new record to DB
//   res.send(req.body);
// });

router.post('/', function(req, res){
  db.pokemon.create(req.body).then(function(createdPokemon){
    console.log('pokemon created looks like:', createdPokemon);
    res.redirect('/pokemon');
  }).catch(function(err){
    console.log('error happened', err);
    res.render('404');
  });
});

router.get('/:id', function(req, res){
  db.pokemon.findById(req.params.id).then(function(foundPokemon){
    res.render('pokemon/:id', foundPokemon);
  }).catch(function(err){
    console.log('err', err);
    res.render('404');
  });
});

router.delete('/:id', function(req, res){
  db.pokemon.destroy({
    where: { id: req.params.id }
  }).then(function(recentlyDestroyed){
    console.log('deleted:', recentlyDestroyed);
    res.render('/pokemon');
  }).catch(function(err){
    console.log('err', err);
    res.send('sad fail');
  });
});


module.exports = router;
