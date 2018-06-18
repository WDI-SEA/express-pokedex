var express = require('express');
var router = express.Router();

//GET route /pokemon - return a page filled with favorited Pokemon.
// router.get('/pokemon', function(req, res) {
//   db.pokemon.findAll().then(function(data) {
//     console.log('I found all the pokemon!');
//     res.render('pokemon/index', { pokemon: data });
//   });
// });

// router.post('/pokemon', function(req, res) {
//   db.pokemon.create({
//     name: req.body.name
//   }).then(function(data) {
//      res.redirect('/pokemon');
//    });
// });

// GET /pokemon - return a page with favorited Pokemon
// router.get('/', function(req, res) {
//   // TODO: Get all records from the DB and render to view
//   res.send('Render a page of favorites here');
// });
//
// // POST /pokemon - receive the name of a pokemon and add it to the database
// router.post('/', function(req, res) {
//   // TODO: Get form data and add a new record to DB
//   res.send(req.body);
// });








module.exports = router;
