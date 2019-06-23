var express = require('express');
var router = express.Router(); //attach routes to this, exports to main file. Router when not in same file/directory.
var db = require('../models');   //path from routes to pk.js and models from models director. Must provide models to routes.

// GET /pokemon - return a page with favorited Pokemon. Mounted on to pokemon to separate routes from main file.
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  // call db.pokemon.findAll
  // Get data and render it into an ejs
  res.send('Render a page of favorites here'); //will need to refactor this line to a res.render
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  // Call db.pokemon.create and pass in the data from the form
  // When the promise returns, we need to redirect to /pokemon
  res.send(req.body);
});

//Get /pokemon/:id - Gets one pokemon ID from the database
//and uses it to look up details about that one pokemon. 
router.get('/:id', function(req, res) {
  //look up pokemon in our db by its ID. (findByPk)
  //uses the query to then access the API 
  //Use the pokemon name from the DB to query the api for details on that one pokemon.
  //Take data from the api and render a detail/show page for this one pokemon
  res.send("this is the route for showing one pokemon.");
})






module.exports = router;
