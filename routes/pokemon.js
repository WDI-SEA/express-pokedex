var express = require('express');
var router = express.Router();
var db = require("../models");
var request = require('request');

// Helper Function
function capitaliseFirstLetter(string) {
  return string.charAt(0).toUpperCase()+string.slice(1);
}

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokeman.findAll().then((pokeman)=>{
    res.render("pokemon/index", {pokemon: pokeman, capitalise: capitaliseFirstLetter});
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

// Delete the favourites
router.delete('/:id', (req, res)=>{
  var faveId = req.params.id;
  db.pokeman.destroy({
    where: {id: faveId}
  }).then(deletedFave => {
    res.redirect("/pokemon");
  }).catch((err)=>{
    if (err) {
      res.render("error", {error: err, errorLocale: "Deleting Fave: pokemon.js, line: 37"})
    } 
  });
})

router.get('/:idx', function (req, res) {
  var pokeAddress = req.params.idx.toLowerCase();
  request(`http://pokeapi.co/api/v2/pokemon/${pokeAddress}`, function(error, response, body){
    if (error || response.statusCode != 200) {
      res.render('error', {userInput: req.body.locationInput, error: error, errorLocale: "Show Pokemon: pokemon.js, line: 46"});
    } else {
      var pokeData = JSON.parse(body);
      res.render('pokemon/show', {pokemon: req.params.idx, pokeData: pokeData, capitalise: capitaliseFirstLetter});
    }
  })
})

module.exports = router;
