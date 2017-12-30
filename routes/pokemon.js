var express = require('express');
var router = express.Router();
var db = require("../models");
var request = require('request');

var POKEMON_URL = "http://pokeapi.co/api/v2/pokemon/";

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
         res.render("pokemon/info", {poke:poke});
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
   request(POKEMON_URL+req.body.name, function(error, response, body) {
      var pokemon = JSON.parse(body);
      let obj = {
         "name": pokemon.name,
         "baseexp": pokemon.base_experience,
         "imageurl": pokemon.sprites.front_default
      }

      db.pokemon.create(obj).then(
         function(result) {
            res.redirect("/pokemon");
      }).catch(
         function (err) {
            res.send("DB create error.",err);
      });
   });

});

//BONUS TODO: delete
router.delete("/:id", function(req,res) {
   if(req.params.id) {
      db.pokemon.destroy({
         where: { "id": req.params.id }
      }).then(
         function(deleted) {
            console.log("db delete",req.params.id);
            res.send(success);
      }).catch(
         function(err) {
            res.send("DB error:"+err);
      });
   }
});

module.exports = router;
