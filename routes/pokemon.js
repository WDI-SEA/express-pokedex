var express = require('express');
var router = express.Router();

var db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(data) {
  	// change index to a favorites page ejs!!!
    res.render('pokemon/index', {pokemon: data});
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create({
    name: req.body.name
  }).then(function(data) {
    res.redirect('/pokemon');
  });
});

// GET /pokemon/:id - get info about specific pokemon and display
// router.get('/:id', function(req, res) {
//   var id = parseInt(req.params.id);
//     db.pokemon.find({
//       where: {id: req.params.id}
//     }).then(function(data) {
//         res.render('show', {pokemon: data});
//     });
// });

// DELETE - /pokemon/:id 
router.delete("/:id", function(req, res) {
  db.pokemon.destroy({
    where: {id: req.params.id}
  }).then(function(data) {
    res.sendStatus(200);
  });
});

module.exports = router;
