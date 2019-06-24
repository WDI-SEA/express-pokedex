var express = require('express');
var router = express.Router();
var db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  // call db.pokemon.findAll()
  db.pokemon.findAll().then(function(favorites) {
    res.render('favorites', {favorites: favorites});
  });
  // get data and rener it into an ejs
  //res.send('Render a page of favorites here');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  // call db.pokemon.create() and pass in the data from the form
  db.pokemon.create(req.body).then(function(){
    res.redirect('/pokemon');
  });
  // when the promise returns we need to redirect to /pokemon
});

// GET /pokemon/:id - Gets one pokemon id from the database
// and uses to look up details about that one pokemon
router.get('/:id', function(req , res) {
  // Look up pokemon in our db by its ID (findByPk)
  // Use the pokemon name from the db to query the api for details on that one pokemon
  // take data from the api and render a details/show page for this one pokemon
  res.send('this is the route for showing one pokemon');
});

module.exports = router;
