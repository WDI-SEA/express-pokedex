var express = require('express');
var router = express.Router();
var db = require("../models");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended: false}));

// GET - return a page with favorited Pokemon
router.get("/", function(req, res){
	db.pokemon.findAll({ 
	limit: 151,
	order: 'name ASC'
	}).then(function(pokemon){
		//We got the facts, lets render them
	res.render("index", {pokemon: pokemon});
	}).catch(function(err){
		//this never gets run unless there is an error
		console.log(err);
		res.send("Oh No! Server Error.");
	});
});

// POST - receive the name of a pokemon and add it to the database
router.post("/", function(req, res){
			db.pokemon.create({
			name: req.body.name
			}).then(function(data){
			//you can now access newly created data
			if(data){
				res.status(200).redirect("/pokemon");
			}
			else{
				res.status(500).send("Server error");
			}
	});
});


module.exports = router;
