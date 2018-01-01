var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var path = require('path');

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(path.join(__dirname, "/public/")));

var currentPage = "http://pokeapi.co/api/v2/pokemon/";
var nextPage = "";
var prevPage = "";
var cachePage = "";
var cache = {};

app.get('/', function(req, res) {
    var pokemonUrl = currentPage;

    if (pokemonUrl != cachePage || cache ==={}) {
      request(pokemonUrl, function(error, response, body) {
         if (error) {
            res.send("Request error.");
            return 0;
         }
         var pokemon = JSON.parse(body).results;
         cache = pokemon;
         cachePage = pokemonUrl;
         nextPage = JSON.parse(body).next;
         prevPage = JSON.parse(body).previous;
         res.render('index', { pokemon: pokemon });
      });
   } else {
      console.log("using cache");
      res.render('index', {pokemon: cache});
   }
});

app.get("/l", function(req,res) {
   if(prevPage) currentPage = prevPage;
   res.redirect("/");
});

app.get("/r", function(req,res) {
   if(nextPage) currentPage = nextPage;
   res.redirect("/");
});

app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
