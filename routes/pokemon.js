var express = require('express');
var router = express.Router();
var db = require("../models");
var request = require('request');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokeman.findAll().then((pokeman)=>{
    res.render("pokemon/index", {pokemon: pokeman});
  }).catch((err)=>console.log("Bad news Bears, there's been an error" + err));
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res)=>{
  // TODO: Get form data and add a new record to DB
  db.pokeman.create({
    name: req.body.name
  }).then((data)=>{
    res.redirect("/pokemon");
  }).catch((err)=>console.log("Bad news bears, db.pokemon.create has an error", err))
});

router.delete('/:id', (req, res)=>{
  var faveId = req.params.id;
  db.pokeman.destroy({
    where: {id: faveId}
  }).then(deletedFave => {
    console.log(deletedFave);
    res.redirect("/pokemon");
  }).catch((err)=>console.log("Deleting error ", err));
})

router.get('/:idx', function (req, res) {
  var pokeAddress = req.params.idx.toLowerCase();
  request(`http://pokeapi.co/api/v2/pokemon/${pokeAddress}`, function(error, response, body){
    if (error) {
      console.log('Rutron Spaghettion, ', error);
      res.render('Error', {userInput: req.body.locationInput});
    } else {
      var pokeData = JSON.parse(body);
      res.render('pokemon/show', {pokemon: req.params.idx, pokeData: pokeData});
    }
  })
})

module.exports = router;
