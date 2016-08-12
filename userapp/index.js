var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var db = require('./models');

db.pokemon.create({
  name: 'Pikachu'
}).then(function(newPokemon) {
  console.log(newPokemon.get());
});

app.get('/pokemon', function(req,res) { 
  console.log('Found root route');
  db.pokemon.findAll().then(function(user){ //db.user.post db.user
    console.log(users);
    res.render('index.ejs', {pokemon: pokemon}); 
  });


