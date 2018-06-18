var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(data) {
    console.log('I found all the pokemon!');
    res.render('pokemon/index', { pokemon: data });
  });
});

router.post('/', function(req, res) {
  console.log('Post pokemon!')
  db.pokemon.create({
    name: req.body.name
  }).then(function(data) {
     res.redirect('pokemon/');
   });
});





router.get('/pokemon/:index', function(req, res) {
  var index = parseInt(req.params.index);
  db.pokemon.find({
//add addtional params here for additional items to display.
    where: {id: req.params.index}
    }).then(function(data) {
      console.log(data);
      if(data != null){
        res.render('pokemon/show', {pokemon: data});
      } else {
        res.render('pokemon/404');
      }
    });
});

//TODO fix delete bug, causing everything on page to disappear.
router.delete('/pokemon/:index', function(req,res) {
  db.pokemon.destroy({
    where: {id: req.params.index}
  }).then(function(data) {
    console.log(data);
    res.sendStatus(200);
  });
});















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
