var express = require('express');
var router = express.Router();
var db = require("../models");
var path = require('path');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll({
    order: [
      ['id', 'ASC']
    ]
  }).then(function(pokemon){
    res.render('pokemon', {pokemon: pokemon});
  });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  console.log(req.body.name);
  db.pokemon.create(req.body).then(function(pokemon){
    console.log("pokemon added to db favorites:", req.body.name);
    res.redirect("/");
  });
});

//DELETE delete existing pokemon from favorites
router.delete("/:id", function(req, res){
  var deletePokemon = req.params.id;
  db.pokemon.destroy({
    where: { id: deletePokemon }
  }).then(function(){
    res.send("pokemon deleted");
  });
});

module.exports = router;
