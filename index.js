var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var pg = require('pg');
var db = require("./models");
var pghstore = require('pg-hstore');
var app = express();

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use('/', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

app.use('/pokemon/favorite', require('./routes/pokemon'));
//not sure if this is needed...


app.get('/', function(req, res) {
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';

    request(pokemonUrl, function(error, response, body) {
        var pokemon = JSON.parse(body).results;
        res.render('index', {pokemon:pokemon});
    });
});

app.get('/pokemon/:id', function(req, res){
	db.article.findById(req.params.id).then(function(pokemon){
		console.log(pokemon);
		res.render('pokemon/single', {'pokemon': pokemon});
	})
});


var server = app.listen(process.env.PORT || 3000);

module.exports = server;
