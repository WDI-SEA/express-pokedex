var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');
// GET /pokemon - return a page with favorited Pokemon
// router.get('/', function(req, res) {
//   // TODO: Get all records from the DB and render to view
//   res.send('Render a page of favorites here');
// });
router.get('/', function(req, res){
    db.pokemon.findAll().then(function(data){
      res.render('pokemon',{pokemon: data})
    })
})


router.post('/', function(req, res){
  db.pokemon.create({
    name: req.body.name
  }).then(function(data){
    res.redirect('pokemon')
  })
})


router.get('/:name', function(req, res){

 var urlPokemon = 'http://pokeapi.co/api/v2/pokemon/' + req.params.name;
 request({
        url: urlPokemon

       },


  function(error, response, body){

    var pokeData = JSON.parse(body);
   res.render('selectpokemon', {pokeData: pokeData});
   console.log(pokeData);
   console.log(pokeData.stats);
   })
 });

// POST /pokemon - receive the name of a pokemon and add it to the database
// router.post('/', function(req, res) {
//   // TODO: Get form data and add a new record to DB
//   res.send(req.body);
// });

module.exports = router;
