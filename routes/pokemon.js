var express = require('express');
var router = express.Router();
var request = require('request');
var db = require("../models");
var app = express();
app.use(express.static(__dirname + "/public"));

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(pokemon) {
		res.render("./pokemon", {pokemon: pokemon});
	});
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create(req.body).then(function(pokemon) {
      res.redirect("/pokemon");
   });
});

// router.post('/', function(req, res) {
//   res.send(req.body);
//   db.pokemon.findOrCreate({
//     where: {
//        name: req.body.name
//      }
//    }).spread(function(pokemon, created){
//        res.redirect("./pokemon");
//      }).error(function(err){
//        console.log("already in pokedex")
//      })
//    });

router.get("/:name", function(req, res){
  var pokemonUrl = "http://pokeapi.co/api/v2/pokemon/" + req.params.name;
  var speciesUrl = "http://pokeapi.co/api/v2/pokemon-species/" + req.params.name;
  request(pokemonUrl, function(error, response, body){
      var dataObj = JSON.parse(body);
      request(speciesUrl, function(error2, response2, body2){
          var dataObj2 = JSON.parse(body2);
          res.render("./show", {pokemon: dataObj, species: dataObj2});
      });
  });
});


//
router.delete("/:name", function(req, res){
  db.pokemon.destroy({
    where: {name: req.params.name}
  }).then(function(){
   res.redirect("/pokemon");
  })
});

module.exports = router;
