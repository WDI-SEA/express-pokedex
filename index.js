var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var server;
var favPokemons;
var pokemons;
var db = require('./models/')

const pokeApiUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=151';

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public/'));

app.get('/', function(req, res, next) {
  
  db.pokemon.findAll().then(function(dbpoke){
        favPokemons = dbpoke;
    });

  request(pokeApiUrl, function(error, response, body) {
    pokemons = JSON.parse(body).results;

    res.render('index', {pokemons:pokemons, 
                        favPokemons:favPokemons
    });
  })
});

app.use('/pokemon', require('./routes/pokemon'));

//Makes sure that the server is not listening "twice" during testing
if (!module.parent) { server = app.listen(process.env.PORT || 3333)};

module.exports = app;
