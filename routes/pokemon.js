var express = require('express');
var db = require("../models");
var router = express.Router();


// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.favorite.findAll().then(function(faves){
    res.render("favorites", {favorites:faves})
  });
});
//          ^^change to res.render and display data from sql db



// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // findorcreate
  db.favorite.findOrCreate({
    where:{name: req.body.name}
  }).spread(function(newFavorite, wasCreated){
    var message = "";
    if (wasCreated) {
      message = "Favorited!";
    }
    else {
      message = "already favorited" + req.body.name;
    };
    res.render("success",{pokemon: req.body.name, message: message});
  });
});


module.exports = router;
