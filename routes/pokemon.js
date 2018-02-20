var db = require("../models");
var request = require('request');
var express = require('express');
var router = express.Router();


// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    db.pokemon.findAll().then(function(data){
      res.render("favorites", {list: data})
    })
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    db.pokemon.create({
      name: req.body.name
    }).then(function(data){
      res.redirect("/pokemon")
    });
    //res.send(req.body);
});

router.delete('/:id', function(req, res){
  db.pokemon.destroy({
    where: {id: req.params.id}
  }).then(function(){
    res.send();
  });
})

router.get("/:id", function(req, res){
  db.pokemon.find({
    where: {id: req.params.id}
  }).then(function(data){
    request({
      url: "http://pokeapi.co/api/v2/pokemon/" + data.name
    }, function(error, response, body){
      var dataObj = JSON.parse(body);
      console.log(dataObj)
      res.render("details", {pokemon:dataObj, name:req.params.id})
    });
  });
});

module.exports = router;
