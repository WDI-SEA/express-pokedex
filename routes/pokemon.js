var express = require('express');
var router = express.Router();
var db = require('../models');
const axios = require('axios');
const methodOverride = require('method-override');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view

  // call db.pokemon.findAll
  db.pokemon.findAll().then(function(pokes){
    res.render('pokemon/favPokemons', {pokes})
  })
  // Get data and render it into an ejs
  // res.send('Render a page of favorites here');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  // call db.pokemon.create and pass in the data from the form

db.pokemon.create({
    name: req.body.name
  }).then(function(poke){
    res.json(poke)
  })
  res.redirect('/pokemon')
  // When the promise returns, we need to redirect to /pokemon
});

// GET /pokemon/:id - Gets one pokemon id from the database
// and uses it to look up details about that one pokemon
router.get('/:id', function(req, res){
  // Look up pokemon in our db by its ID (findBypk)
  let id = parseInt(req.params.id);
  db.pokemon.findByPk(id).then(function(poke){
    var pokeName = poke.name;
    var pokeUrl = "http://pokeapi.co/api/v2/pokemon/" + pokeName + "/";
    axios.get(pokeUrl).then( function(apiResponse){
      let pokeDetails = apiResponse.data;
      res.render('pokemon/pokeDetails', {pokeDetails, id})
    })
  })
  // Use the pokemon name from the db to query the api for details on that one pokemon
  // Take data from the API and render a detail/show page for this one pokemon
  
})

router.delete('/:id', function(req, res){
  let id = parseInt(req.params.id);
  db.pokemon.destroy({
    where: {id: id}
  }).then(function(pokemons){
    res.redirect('/pokemon');
  })
  
})
module.exports = router;
