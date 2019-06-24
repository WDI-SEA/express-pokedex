var express = require('express');
var router = express.Router();
var db = require('../models');
var axios = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function (req, res) {
  // TODO: Get all records from the DB and render to view
  // call db.pokemon.findAll
  //Get Data and render it into ejs
  db.pokemon.findAll().then(function (favorites) {
    res.render('favorites', { favorites: favorites });
  });
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function (req, res) {
  // TODO: Get form data and add a new record to DB
  //call db.pokemon.create and pass in the data from the form
  //when the promise return we need to redirect to /pokemon
  db.pokemon.create(req.body).then(function () {
    res.redirect('pokemon');

  })
});

//GET /pokemon/:id - gets one pokemon id from the database and
router.get('/:id', function(req, res){
  db.pokemon.findByPk(parseInt(req.params.id)).then(function(pokemon){
    console.log('this is the pokemon: ' + pokemon)
    axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
    .then(function(response){
      res.render('show', {pokemon: response.data} )
    })
  });
});


//DELETE


module.exports = router;
