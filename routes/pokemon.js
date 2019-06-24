var express = require('express');
var router = express.Router();
const axios = require('axios'); 
var db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(pokemon) {
    res.render('favorites', {pokemon});
    console.log(pokemon);
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create({
    name: req.body.name
    }).then(function(data) {
      console.log(data);
      res.redirect('/');
    })
  });

//GET /pokemon/:id -- renders show page: gets one pokemon id from the database 
//and uses it to look up details about that one pokemon
router.get('/show/:id', function(req, res) {
  db.pokemon.findOne({
    where: {id: parseInt(req.params.id)}
  }).then(function(data){
    console.log(data.name);
    return axios.get('https://pokeapi.co/api/v2/pokemon/' + data.name + '/')
  }).then(function(response) {
    console.log("I'm the response data: " + response.data);
    res.render('show', {pokemon: response.data});
  }).catch(function(error) {
      console.log(error);
  })
});


module.exports = router;