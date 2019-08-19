require('dotenv').config();
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 3000;
const db = require("./models");

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// GET / - main index of site
app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
  // Use request to call the API
  axios.get(pokemonUrl + "?limit=151").then( function(apiResponse) {
  // 	if (apiResponse.statusCode !== 200) {
  // 		res.send("ERROR: Couldn't get a response from the api");
  // 		console.log("ERROR: Couldn't get a response from the api", apiResponse.statusCode);
  // 	} else {
  		db.pokemon.findAll()
  		.then((favorites) => {
  		    var pokemon = apiResponse.data.results;
  		    var faves = favorites.map(f => f.name);
  		    console.log("FAVES:");
  		    console.log(faves);
		    res.render('index', {
		    	pokemon,
		    	faves });
  		})
  		.catch((e) => {
  			res.render("ERROR: Problem accessing database");
  			console.log("ERROR: Problem accessing database", e);
  		});
  })
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(port, function() {
  console.log('...listening on', port );
});

module.exports = server;
