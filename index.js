var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'pug');
app.set('view options', {
  layout: false // pug has default layout functionality
});

app.use(require('morgan')('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    var apiUrl = 'http://pokeapi.co/api/v2/pokemon?limit=151';
    request(apiUrl, function(error, response, body) {
        var pokemon = JSON.parse(body).results;
        res.render('index', { pokemon: pokemon });
    });
});

// this is how we separate our routes into separate files
app.use('/pokemon/', require('./routes/pokemon'));

app.all('*', function(req, res) {
  res.redirect("/");
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
