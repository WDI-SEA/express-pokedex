var express = require('express');
var router = express.Router();
const axios = require('axios'); 
var db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
    db.pokemon.findAll().then(function(pokemon) {
        res.render("pokemon", { pokemon });
    });
  });

  // Delete /pokemon - return a page with favorited Pokemon
router.delete('/:id', function(req, res) {
  db.pokemon.destroy({where: {id: req.params.id } }).then(function(pokemon) {
      res.render("deletefile", { pokemon });
  });
});

  // TODO: Get all records from the DB and render to view
  //call db.pokemon.findAll
  // Get data and render it into an ejs

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req,res) {
  const { name } = req.body
  // 'https://pokeapi.co/api/v2/pokemon/bulbasaur/'
  var pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${name}`;
  // Use request to call the API
  axios.get(pokemonUrl).then( function(apiResponse) {
    var pokemon = apiResponse.data;
    const { height, weight, base_experience: baseExperience } = pokemon;
    db.pokemon.create({
      name,
      height: parseInt(height) || 0,
      weight: parseInt(weight) || 0,
      base_experience: parseInt(baseExperience) || 0
  }).then(function(data) {
      res.render("newpokemon", { pokemon: data });
  });
  })
    // const { name, height, weight, id, baseExperience } = req.body
   
});
  // TODO: Get form data and add a new record to DB
  //call db.pokemon.create and pass in the data from the form
  //when the promise returns, we need to redirect to /pokemon

// get /pokemon/:id - Gets one pokemon id from the database
// and uses it to look up details about that one pokemon 
router.get('/:id', function(req,res) {
  //Look up pokemon in our db by its ID (findByPk)
  //User the pokemon name from the db to query the api for details on that one pokemon
  // Take data from the api and render a detail/show page for this one pokemon
  res.send("this is the route for showing one pokemon");
})



module.exports = router;
