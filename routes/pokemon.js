var express = require('express');
var db = require('../models');
var router = express.Router();
var request = require('request');


router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(data) {
    console.log('I found all the pokemon!');
    res.render('pokemon/index', { pokemon: data });
  });
});

router.post('/', function(req, res) {
  console.log('Post pokemon!')
  db.pokemon.create({
    name: req.body.name
  }).then(function(data) {
     res.redirect('pokemon/');
   });
});

//GET /pokemon - display pokemon by itself
router.get('/:name', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + req.params.name;
  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body);
    res.render('pokemon/show', {pokemon: pokemon});
    //res.send(pokemon)
    });
});

//DELETE /p
router.delete('/:id', function(req,res) {
  db.pokemon.destroy({
    where: {id: req.params.id}
  }).then(function(data) {
    res.sendStatus(200);
  });
});















//GET route /pokemon - return a page filled with favorited Pokemon.
// router.get('/pokemon', function(req, res) {
//   db.pokemon.findAll().then(function(data) {
//     console.log('I found all the pokemon!');
//     res.render('pokemon/index', { pokemon: data });
//   });
// });

// router.post('/pokemon', function(req, res) {
//   db.pokemon.create({
//     name: req.body.name
//   }).then(function(data) {
//      res.redirect('/pokemon');
//    });
// });

// GET /pokemon - return a page with favorited Pokemon
// router.get('/', function(req, res) {
//   // TODO: Get all records from the DB and render to view
//   res.send('Render a page of favorites here');
// });
//
// // POST /pokemon - receive the name of a pokemon and add it to the database
// router.post('/', function(req, res) {
//   // TODO: Get form data and add a new record to DB
//   res.send(req.body);
// });








module.exports = router;
