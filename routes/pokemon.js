var express = require('express');
var router = express.Router();
var db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(function(data) {
    res.render('favorites/index', {pokemon: data});
    console.log(data);
  });
});
// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  // res.send(req.body);
  res.render('favorites/index');
});

// GET /pokemon/:id - return a page for a specific Pokemon
router.get('/:id', function(req, res) {
  var pokeId = parseInt(req.params.id);
  // TODO: Get one record from the DB and render to view
  db.pokemon.find({
    where: {id: pokeId}
  }).then(function(data) {
    if (data != null) {
      res.render('favorites/show', {pokemon: data});
    } else {
      res.render('404');
    }
    console.log(data);
  });
});



module.exports = router;
