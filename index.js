
//Requires & Global Vars
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

//Set & Use Statements 
app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));
app.use('/pokemon', require('./routes/pokemon'));

//Routes
app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=151';

  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    res.render('index', { pokemon: pokemon });
  });
});


// app.get('/pokemon', function(req, res) {
//   var pokemon = {
//       name: req.query.name
//   };

//   request({
//   	url: 'http://pokeapi.co/api/v2/pokemon/?limit=151',
//   	//qs: pokemon
//   }, function(error, response, body){
//   		var pokemon = JSON.parse(body).results;
//   		res.render('index', { pokemon: pokemon });
//   });
// });


//Listen 'nodemon'
var server = app.listen(process.env.PORT || 3000);
module.exports = server;
