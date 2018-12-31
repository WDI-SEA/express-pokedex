var express = require('express');
var router = express.Router();
var db = require("../models");

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokeman.findAll().then((pokeman)=>{
    res.render("pokemon/index", {pokemon: pokeman});
  }).catch((err)=>console.log("Bad news Bears, there's been an error" + err));
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  res.send(req.body);
});

module.exports = router;
