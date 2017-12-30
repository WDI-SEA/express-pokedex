var express = require('express');
var router = express.Router();
var db = require("../models");

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
   //TODO: make layout for single pokemon view
   db.pokemon.findById(req.params.id).then(
      function(poke) {
         res.render("pokemon/single", {poke:poke});
      }
   ).catch(
      function(err) {
         res.send("Pokemon not found.");
      }
   );
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database
    res.send(req.body);
});

//BONUS TODO: delete


module.exports = router;
