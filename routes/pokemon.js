var request = require('request');
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

// models/index.js exports db
var db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // declare list of pokemon names to be sent
  var nameList = [];
  // get list of pokemon from database
  db.pokemon.findAll().then(function(pokemons) {
    // // console log entirety of fulfilled promise
    // console.log('fulfilled promise from pokemon.findAll()', pokemons);
    pokemons.forEach(function(pokemon) {
      // console log structure of data returned
      // console.log('an ele in pokemons[]', pokemon);
      // console.log('dataValues of ele:', pokemon.dataValues);
      console.log('name of pokemon:', pokemon.dataValues.name);
      // add pokemon name to name list
      nameList.push(pokemon.dataValues.name);
    });
    // render pokemon index with all names sent for page to use
    res.render('pokemon/index', { nameList: nameList });
  }).catch(function(err) {
    console.log('fetch index of pokemon from db failed with err', err);
    res.send('awesome 404 page, enjoy it');
  });
});

// i know instructions wanted row id, but it doesn't make sense for the user
// i'm still making the DB call, even though i have the name already
// justification: ensures the given name is a favorited pokemon
router.get('/:name', function(req, res) {
  // get name of requested pokemon
  var name = req.params.name;
  console.log('name type is', typeof name);
  console.log('name of wanted pokemon:', name);
  db.pokemon.findOne({ where: { name: name } }).then(function(fetched) {
    // yes...i'm using the name to get the name...practice using models
    var fetchedName = fetched.dataValues.name;
    // setup api call, using string interpolation to insert the name
    var api = `http://pokeapi.co/api/v2/pokemon/${fetchedName}/`;
    request(api, function(error, response, body) {
      console.log('request for pokestats reached');
      // turn stringified body back into json
      var stats = JSON.parse(body);
      res.send(stats);
    });
  }).catch(function(err) {
    console.log('could not fetch pokemon with name', name);
    res.send('pokemon ' + name + ' is not favorited');
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // get to-favorite pokemon's name
  var name = req.body.name;
  console.log('recieved req to favorite:', name);
  // "favorite" the pokemon, if it isn't already favorited
  db.pokemon.findOrCreate({where: {name: name }}).then(function(favorited) {
    // send user to their favorites AFTER it has updated
    res.redirect('/pokemon');
  }).catch(function(err) {
    console.log('favoriting failed with err', err);
    res.send('failed to favorite that pokemon');
  });
  // console.log('after favorited, found:', db.pokemon.find({where:
    // {name: name}}).dataValues.name);
});

/** @suppress {missingRequire} */
module.exports = router;
