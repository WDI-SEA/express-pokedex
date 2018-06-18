require('dotenv').config();
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var app = express();
var port = process.env.PORT || 2000;

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
//app.use(express.static(__dirname + '/public'));

// GET / - main index of site
app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    res.render('index', { pokemon: pokemon });
  });
});

app.get('/pokemon', function(req, res) {
  db.pokemon.findAll().then(function(data) {
    console.log('I found all the pokemon!');
    res.render('pokemon/index', { pokemon: data });
  });
});

app.post('/pokemon', function(req, res) {
  console.log('Post pokemon!')
  db.pokemon.create({
    name: req.body.name
  }).then(function(data) {
     res.redirect('/pokemon');
   });
});

//TODO figure out how to get data from the api, and return it on each req.
app.get('/pokemon/:index', function(req, res) {
  var index = parseInt(req.params.index);
  db.pokemon.find({
    where: {id: req.params.index}
    }).then(function(data) {
      console.log(data);
      if(data != null){
        res.render('pokemon/show', {pokemon: data});
      } else {
        res.render('pokemon/404');
      }
    });
});

//TODO fix delete bug, causing everything on page to disappear.
app.delete('/pokemon/:index', function(req,res) {
  db.pokemon.destroy({
    where: {id: req.params.index}
  }).then(function(data) {
    console.log(data);
    res.sendStatus(200);
  });
});



// Imports all routes from the pokemon routes file
//app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(process.env.PORT || 3000);
module.exports = server;
