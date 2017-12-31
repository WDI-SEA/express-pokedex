var express = require('express');
var router = express.Router();
var db = require("../models");
var request = require('request');

var POKEMON_URL = "http://pokeapi.co/api/v2/pokemon/";
var lastreq = "";
var cacheName = "";
var cacheInfo = {};

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: make ejs layout
    db.pokemon.findAll().then(
      function(itemList) {
         res.render("pokemon/favlist", {itemList: itemList});
      }
   );
});

router.get("/:id", function(req,res) {
   //single pokemon view
   db.pokemon.findById(req.params.id).then(
      function(poke) {
         if (cacheName===poke.name) {
            console.log("..using cache");
            res.render("pokemon/info", {pokemon:cacheInfo});
         } else {
            request(POKEMON_URL+poke.name, function(error, response, body) {
               cacheName = poke.name;
               var pokemon = JSON.parse(body);
               cacheInfo = pokemon;
               // console.log(pokemon);
               res.render("pokemon/info", {pokemon:pokemon});
            });
         }
      }
   ).catch(
      function(err) {
         res.send("Pokemon not found.");
      }
   );
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
   //-- grab info first

   lastreq = req.body.name;
   request(POKEMON_URL+req.body.name, function(error, response, body) {
      var pokemon = JSON.parse(body);
      let obj = {
         "name": pokemon.name,
         "pokeid": pokemon.id,
         "baseexp": pokemon.base_experience,
         "imageurl": pokemon.sprites.front_default
      }
      lastreq="";
      db.pokemon.create(obj).then(
         function(result) {
            res.redirect("/pokemon");
         }).catch(
            function (err) {
               res.send("DB create error.",err);
            });
         });
});

//--delete
router.delete("/:id", function(req,res) {
   if(req.params.id) {
      db.pokemon.destroy({
         where: { "id": req.params.id }
      }).then(
         function(deleted) {
            console.log("db delete",req.params.id);
            res.send("ok");
      }).catch(
         function(err) {
            res.send("DB error:"+err);
      });
   }
});

module.exports = router;
