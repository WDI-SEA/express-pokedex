var db = require('../models');
var express = require('express');
var bodyParser = require("body-parser");
var fs = require('fs');
var router = express.Router();

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.favorite.findAll().then(function(user){
    //console.log(user);

    res.render('pokemon', { user: user });
  });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  
  //res.send(req.body);

  //console.log(req.body.name);
  //var data = JSON.parse(req.body);
  //console.log(data.name);
  
  db.favorite.create({
    name: req.body.name
  }).then(function(newPokemon) {
    console.log(newPokemon.get());

    res.redirect('/pokemon');
  });
  
  
});

module.exports = router;
