var express = require('express');
var router = express.Router();
var db = require("../models");
var request = require('request'); 
var app = express(); 


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.favorite.findAll().then(function(favorites){
    // TODO: Get all records from the DB and render to view
      // rendered the favroites DB 
    res.render("favs", {favorites});
  }); 
});


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
// console.log("posting to the pokedex")
  db.favorite.create({
    name: req.body.name
      }).then(function(){
        res.redirect("/pokemon")
  });
});


// 1 ID POKEMON
router.get("/:name", function(req, res){
console.log("selecting Poke ID") 
  var url = "http://pokeapi.co/api/v2/pokemon/" + req.params.name
  request(url, function(error, response, body){
  var info = JSON.parse(body)
  var speciesUrl = info.species.url;
    request(speciesUrl, function(error, response, body){
      var speciesInfo = JSON.parse(body)
      res.render('show', {info, speciesInfo});
    });
  });
});


// route.delete('/:name', function(req, res){
//   db.favorite.destroy({
//     where: {name:req.body.name}
//   }).then(function(){
//     res.redirect("/pokemon")
//   }); 
// });







module.exports = router;
