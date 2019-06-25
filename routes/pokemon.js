var express = require('express');
var router = express.Router();
var db = require('../models')
var axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  // call db.pokemon.findall
  // get data and render it into an ejs
  // 
  db.pokemon.findAll().then(function (data) {
      res.render('pokemon/index', {data: data});
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  // call db.pokemone.create and pass in the data from the form
  // when the promise returns, we need to redirect to /pokemon
  db.pokemon.create({
    name: req.body.name
  }).then( function(data) {
    res.redirect('/pokemon')
  })

});

// GET /pokemon/:id - Get one pokemon id from the database
// and uses it to look up details about that one pokemon
// 
router.get('/:id', function(req, res) {
  // look up pokemon in our db by its ID (findByPk)
  // Use the pokemon name from the db to query the api for details on that one pokemon
  // take data from the api and render a detail/show page for this one pokemon
  // 
  var id = req.params.id;
  db.pokemon.findByPk(id).then(function(pokemon) {
    var url = 'http://pokeapi.co/api/v2/pokemon/' + pokemon.name;
    axios.get(url).then( function(response) {
      // response
    res.render('pokemon/show', {pokemon: response.data})
    });
  });
});

module.exports = router;
