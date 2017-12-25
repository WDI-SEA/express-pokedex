var express = require('express');
var router = express.Router();

// GET - return a page with favorited Pokemon
router.get('/pokemon/', function(req, res) {
    var db = require("./models");
	db.pokemon.findAll().then(function(users) {
  console.log(users);
  // users will be an array of all User instances
    res.render('./pokemon/favorite');

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database

});
});
	});
module.exports = router;
