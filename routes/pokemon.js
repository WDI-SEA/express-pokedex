var express = require('express');
var router = express.Router();
var db = require("../models");
var request = require("request");
var ejsLayouts = require("express-ejs-Layouts");

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
	db.favorite.findAll().then(function(favorite) {
		res.render("./pokemon/show", {favorite:favorite});
	});
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    db.favorite.create(req.body).then(function(createArticle){
    	res.redirect("/pokemon");
    });
});

//DELETE route to delete pokemon from db and from favorites page
router.delete("/:id", function(req, res){
	console.log("delete route ID =", req.params.id);
	db.favorite.destroy({
		where: {id: req.params.id}
	}).then(function(deleted){
		console.log("deleted = ", deleted);
		res.send("success");
	}).catch(function(err){
		console.log("error happend", err);
		res.sen("fail");
	});
});


module.exports = router;
