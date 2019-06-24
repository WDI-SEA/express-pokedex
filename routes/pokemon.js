var express = require('express');
const axios = require('axios');
var router = express.Router(); // Use Router instead of App....
var db = require('../models'); // Need to provide models to our routes

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) { // appends to the first parameter in the index.js file
  db.pokemon.findAll().then(function(pokemon) {
    res.render("favorites", {pokemon});
  });
  // TODO: Get all records from the DB and render to view
  // call db.pokemon.findAll()
  // Get data and render it into an ejs
  // res.send('Render a page of favorites here');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) { // appends to the first parameter in the index.js file
  db.pokemon.create({
    name: req.body.name
  }).then(function(data) {
    res.redirect('/pokemon');
  });
  // TODO: Get form data and add a new record to DB
  // Call db.pokemon.create and pass in the data from the form
  // When the promise returns, we need to redirect to /pokemon
  // res.send(req.body);
});


// Get /pokemon/:id - Gets one pokemon id from the database
// and uses it to look up details about that one pokemon
router.get('/:name', function(req, res) {
  // TODO: Look up pokemon in our db by its ID (findByPk)
  // console.log(req.params.id);
  // db.pokemon.findByPk(parseInt(req.params.id)
  // ).then(function(pokemon) {
    axios.get('http://pokeapi.co/api/v2/pokemon/' + req.params.name).then (function(apiResponse) {
      var pokemonDetails = apiResponse.data;
      console.log(pokemonDetails)
      res.render('show', {pokemon: pokemonDetails});
    });
  });
// });
  
 
  // Use the pokemon name from the db to query the api (axios) for details on that one pokemon 
  // Take data from the api and render a details/show page for this one pokemon
  // res.send('This is the route for showing one pokemon');
// });

router.delete('/:name', function(req, res) {
  db.pokemon.destroy ({
    where: {name: req.params.name}
    }).then(function(pokemon) {
    res.redirect('/pokemon'); 
  });
});

// PUT /pokemon/:id
// router.put("/:id")

module.exports = router;
