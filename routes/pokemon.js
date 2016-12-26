var express = require('express');
var router = express.Router();
var db = require("../models");
var path = require('path');

// GET - return a page with favorited Pokemon
router.get('/pokemon', function(req, res) {
  res.send('Render a page of favorites her');
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  console.log(req.body.name);
  db.pokemon.create(req.body).then(function(pokemon){
    console.log("pokemon added to db favorites:", req.body.name);
    res.redirect("/");
  });
});

module.exports = router;
