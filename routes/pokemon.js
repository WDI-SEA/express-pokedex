var express = require('express');
var router = express.Router();
var request = require('request');
var db = require("../models");

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  //retrive pokemon from database
  db.pokemon.findAll().then(function(result){
    //send list of pokemon names to page
    res.render("pokemon/index", {favoritePokemon: result, species: {flavor_text_entries: []}});
  })
  .catch(function(error){
    res.status(404).send("you stink");
  });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create(req.body).then(function(newFavorite){
    res.redirect("/pokemon");
  });
});

router.get("/:name", function(req, res){
  //access poke api
  // var dataObj = {
  //   "id": 1,
  //   "name": "bulbasaur",
  //   "sprites": {
  //     "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
  //     "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
  //     "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  //     "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png"
  //   },
  // };
  // res.render("pokemon/show", {pokemon: dataObj});
  var pokemonUrl = "http://pokeapi.co/api/v2/pokemon/" + req.params.name;
  var speciesUrl = "http://pokeapi.co/api/v2/pokemon-species/" + req.params.name;

  request(pokemonUrl, function(error, response, body){
    if(!error && response.statusCode == 200){
      var dataObj = JSON.parse(body);
      request(speciesUrl, function(error1, response1, body1){
        if(!error1 && response1.statusCode == 200){
          var dataObj1 = JSON.parse(body1);
          res.render("pokemon/show", {pokemon: dataObj, species: dataObj1});
        }
      });
    }
  });
});

router.delete("/:name", function(req, res){
  db.pokemon.destroy({
    where: {name: req.params.name}
  }).then(function() {
    res.send({message: "successful deletion"});
  });
});



module.exports = router;
