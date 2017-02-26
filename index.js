var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var db = require('./models');

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=151';

  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    res.render('index', { pokemon: pokemon });
  });
});

app.post('/', function(req,res){
  //check for duplicates
  function isDuplicate(){
    res.render('duplicate', {pokemon: req.body.name});
  }
  function isNotDuplicate(){
    db.pokemon.create(req.body).then(function(newTeam){
      res.redirect("/favorites");
    });
  }
  db.pokemon.findAll()
  .then(function(result){
    var isDuplicateT = false;
    for(var i =0; i <result.length; i++){
      if(result[i].name == req.body.name){
        isDuplicateT = true;
      }
    }
    if(isDuplicateT === false){
      isNotDuplicate()
    }else{
      isDuplicate();
    }
  });
})
app.get('/favorites/', function(req, res){
  db.pokemon.findAll()
  .then(function(result){
    res.render('favorites', {name: result});
  })
  .catch(function(error){
    res.status(404).send("404");
  })
});

app.get('/favorites/:p', function(req,res){
  var pokemonUrlID1 =  'http://pokeapi.co/api/v2/pokemon/' + req.params.p;
  var pokemonUrlID2 = 'http://pokeapi.co/api/v1/sprite/';


  function secondRequest(firstReq){
    firstReq.id = firstReq.id + 1;
    request(pokemonUrlID2 + firstReq.id, function(error, response, body){
      var pokemon = JSON.parse(body);
      res.render('info', {pokemon : pokemon, info: firstReq })
    })
  }
  request(pokemonUrlID1, function(error, response, body) {
    var pokemon = JSON.parse(body);
    secondRequest(pokemon);
  });
})
app.get('/favorites/delete/:p', function(req, res){
  db.pokemon.destroy({
    where: {name: req.params.p}
  }).then(function(){
    res.redirect('/favorites');
  })
});
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
