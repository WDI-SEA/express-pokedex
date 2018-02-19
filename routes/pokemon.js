var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');
// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    db.pokemon.findAll().then(function(pokemon) {
      res.render('favorites', {pokemon: pokemon});
    });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  var pokeName = req.body.name;
  //finds out if pokemon already exists in table
  db.pokemon.count({where: {name: pokeName}}).then(function(data) {
    //if pokemon exists go into table and find that
    if(data !== 0) {
      db.pokemon.findOne({where: {name: pokeName}}).then(function(data) {
        res.render('show', {pokemon: data.dataValues});
      });
    } else {
      //pokemon doesn't exist in table already, do another api call to store name and image
      var pokemonUrlI = 'http://pokeapi.co/api/v2/pokemon/'+pokeName+'';
      var pokeUrlInfo = 'http://pokeapi.co/api/v2/pokemon-species/'+pokeName+'';
      request(pokeUrlInfo, function(error, response, body) {
        var count = 0;
        var pokeInfoLangauge = JSON.parse(body).flavor_text_entries[count].language.name;
        var pokeInfo;
        while(pokeInfoLangauge !== 'en') {
          count++
          pokeInfoLangauge = JSON.parse(body).flavor_text_entries[count].language.name;
          if(pokeInfoLangauge === 'en') {
            pokeInfo = JSON.parse(body).flavor_text_entries[count].flavor_text;
          }
        }
        request(pokemonUrlI, function(error, response, body) {
            var pokemonImage = JSON.parse(body).sprites.front_default;
            var pokeTypesRequest = JSON.parse(body).types;
            var pokeStats = JSON.parse(body).stats
            var pokeTypes = [];
            var pokeStatDef = 0;
            var pokeStatAtt = 0;
            var pokeStatHp = 0;
            pokeTypesRequest.forEach(function(type) {
              var typeName = type.type.name;
              pokeTypes.push(typeName);
            });
            for(var i = 0; i < pokeStats.length; i++) {
              if(pokeStats[i].stat.name === "defense") {
                console.log('success');
                pokeStatDef = pokeStats[i].base_stat;
              }
              if(pokeStats[i].stat.name === "attack") {
                console.log('success');
                pokeStatAtt = pokeStats[i].base_stat;
              }
              if(pokeStats[i].stat.name === "hp") {
                console.log('success');
                pokeStatHp = pokeStats[i].base_stat;
              }
            };
            db.pokemon.create({
              name: pokeName,
              image: pokemonImage,
              info: pokeInfo,
              types: pokeTypes,
              defense: pokeStatDef,
              attack: pokeStatAtt,
              health: pokeStatHp
            }).then(function(data) {

            res.render('show', {pokemon: data.dataValues});
          });
        });
      });
    }
  });
});

router.get('/:name', function(req, res) {
  db.pokemon.find({
    where: {name : req.params.name}
  }).then(function(data) {
    console.log(data);
    res.render('show', {pokemon: data});
  })
});

router.delete('/:name', function(req, res) {
  var pokeToDie = req.params.name;
  console.log(pokeToDie);
  db.pokemon.destroy({where: {name: pokeToDie}}).then(function() {
    res.send();
  });
});

module.exports = router;
