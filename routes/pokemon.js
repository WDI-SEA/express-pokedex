var express = require('express');
var router = express.Router();
var db = require("../models");

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  //res.send('Render a page of favorites here');
	db.pokemon.findAll()
	.then((monster) => {
		res.render("show", {
			monster
		})
	})
	.catch((e) => {
		console.log ("ERROR in pokemon.GET route", e);
		res.send("Error: Failed to display a pokemon");
	})

});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  //res.send(req.body);
	 db.pokemon.create(req.body)
	  .then(() => {
	  	res.redirect("/pokemon");
	  })
	  .catch((e) => {
	  	console.log("ERROR in pokemon.POST route:", e);
	  	res.send("Error: Failed to create a pokemon");
	  })
  });

router.get("/:idx", (req, res) => {
	db.pokemon.findByPk(req.params.idx)
	.then((monster) => {
		res.render("mon", {
			monster
		})
	})
})

router.post("/:idx", (req, res) => {
	db.pokemon.destroy({
		where: {
			id: req.params.idx
		}
	})
	.then(() => {
		res.redirect("/pokemon");
	})
})

module.exports = router;
