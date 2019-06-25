var express = require('express');
var router = express.Router(); //attach routes to this, exports to main file. Router when not in same file/directory.
var db = require('../models');   //path from routes to pk.js and models from models director. Must provide models to routes.
const axios = require('axios');

// GET /pokemon - return a page with favorited Pokemon. Mounted on to pokemon to separate routes from main file.
  // TODO: Get all records from the DB and render to view
  // Get data and render it into an ejs
router.get('/', function(req, res) {
  db.pokemon.findAll()
  .then(function(pokemon){
     res.render('favepk', {pokemon});
  });  
});

// POST /pokemon - receive the name of a pokemon and add it to the database
  // TODO: Get form data and add a new record to DB
  // Call db.pokemon.create and pass in the data from the form
  // When the promise returns, we need to redirect to /pokemon
router.post('/', function(req, res) {
  db.pokemon.create( {
      name: req.body.name
    }).then(function() {
    res.redirect('/pokemon');
  });
});

//Get /pokemon/:id - Gets one pokemon ID from the DATABASE
//SHOW page
//and uses it to look up details about that one pokemon. 
  //look up pokemon in our db by its ID. (findByPk)
  //uses the query to then access the API 
  //Use the pokemon name from the DB to query the api for details on that one pokemon.
  //Take data from the api and render a detail/show page for this one pokemon from the list of all the PKs stored in DB
router.get('/:id', function(req, res) {
  var id = parseInt(req.params.id);
  db.pokemon.findByPk(id).then(function(pokemon) {
    axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
    .then(function(apiResponse) {
      res.render('showpk', {pokemon: apiResponse.data, id});
    })
  });
});

//delete route
router.delete('/:id', function(req, res) {
  console.log('DESTROYYYYYYY')
  db.pokemon.destroy({
    where: {id: parseInt(req.params.id)}
  }).then(function(pokemon){
    res.redirect('/pokemon');
  });
})




module.exports = router;
