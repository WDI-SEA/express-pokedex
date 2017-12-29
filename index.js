var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var server;
var favPokemons;
var pokemons;
var db = require('./models/')

const pokeApiUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=10';

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public/'));

function getFavPokemon(req, res, next){
    db.pokemon.findAll().then(function(data){
        favPokemon = data;
        next();
    });
    
}

app.get('/', function(req, res, next) {
  request(pokeApiUrl, function(error, response, body) {
    pokemons = JSON.parse(body).results;
    console.log(pokemons);
  });
  next();
}, function(req, res, next){
    db.pokemon.findAll().then(function(dbpoke){
        favPokemons = dbpoke;
    });
    next()
}, function (req, res){
    res.render('index', {favPokemons:favPokemons, pokemons:pokemons});
    // res.render('index', {pokemons:pokemons, 
    //                     favPokemons:favPokemons
    //         });
}); 

app.use('/pokemon', require('./routes/pokemon'));

//Makes sure that the server is not listening "twice" during testing
if (!module.parent) { server = app.listen(process.env.PORT || 3333)};

module.exports = app;
