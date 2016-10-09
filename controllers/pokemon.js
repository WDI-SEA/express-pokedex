var express = require("express");
var db = require("../models");

var router = express.Router();


// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll({
  	limit: 50, order: 'name ASC'
  }).then(function(result) {
	  res.render("favorite-pokemon", { pokemon: result });
  }).catch(function(err) {
  	console.log(err);
  	res.send("Oh noes. You've encountered a server error.");
  });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create({
  	name:req.body.name
  }).then(function(data) {
  	if(data) {
  		res.status(200).redirect("./pokemon");
  	} else {
  		res.status(500).send("server error");
  	}
  });
});

// Delete
router.delete("/delete/:id", function(req, res) {
	console.log("delete router")
	db.pokemon.destroy({
		where: {id: req.params.id}
	}).then(function(){
		res.send(sucess);
	}).catch(function(err) {
		console.log(err);
		res.send("Oh noes. You've encountered a server error.");
	});	
});

module.exports = router;