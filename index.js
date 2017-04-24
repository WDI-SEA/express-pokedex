var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require("./models"); //not sure if I need this line
var rowdy = require('rowdy-logger');
var path = require('path');

var app = express();
rowdy.begin(app);

// this sets a static directory for the views
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);


// *********************************GET /ROOT HOMEPAGE *******************************************************
app.get('/', function(req, res) { //root (homepage)
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
    //Pokemon Template
    request(pokemonUrl, function(error, response, body) {
        var pokemon = JSON.parse(body).results; //storing object in a variable called pokemon
        res.render('index', { pokemon: pokemon }); // {object: value}
    });
});

// ******************************LINKS TO ROUTER************************************************************************

app.use('/pokemon', require('./routes/pokemon'));

// ********************************EXECUTE THIS PROCESS TO SERVER AT START PAGE*********************************
var server = app.listen(process.env.PORT || 3000, function() {
    rowdy.print();
});

module.exports = server;
