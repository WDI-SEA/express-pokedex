//Requires
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require("./models");

//Vars
var app = express();

//Use and set statements
app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
// app.use('/pokemon', require('./controllers/pokemon'));

//Routes
//Get the home page
app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';

  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    res.render('index', { pokemon: pokemon });
  });
});





//Get the favorites page
 app.get("/pokemon", function(req, res){
 	db.pokemon.findAll({ 
 		limit: 10, 
 		order: 'name ASC' })
 	.then(function(pokeName){
 	res.render("pokemon", { pokeName: pokeName });
 	})
 	.catch(function(err){  //Only ever executed if theres an error
 		console.log(err);
 		res.send("uh oh - Server Error");

 	});   
 });


//Define a post route for new pokemon
app.post("/", function(req, res){
	db.pokemon.create({
		name: req.body.name
	}).then(function(data){     //only executes when create is complete
		//You can now access newly created data
		if(data){
			res.status(200).redirect("/");
		}
		else {
			res.status(500).send("Server error");
		}
	});
});

//Delete a pokemon
app.delete("/pokemon/delete/:id", function(req, res){
	console.log("inside delete route");
	db.pokemon.destroy({
		where: { id: req.params.id }
	}).then(function(){
		res.send({ message: "success" });
	}).catch(function(err){
		console.log(err);
		res.send("Whoops, server error");
	});
});



var express = require('express');
var router = express.Router();

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  res.send('Render a page of favorites here');
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  res.send(req.body);
});

module.exports = router;




//Listen
var server = app.listen(process.env.PORT || 3000);
module.exports = server;
