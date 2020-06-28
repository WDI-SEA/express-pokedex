var express = require('express');
var router = express.Router();
const axios = require('axios'); // this is always needed wherever called
const db = require('../models');
const { default: Axios } = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function (req, res) {
  db.pokemon.findAll().then(pokemon => {
    res.render('pokemon/index', { pokemon: pokemon })// 'views/' is not needed becuase it was configred in the index,js pace because it already understands to begin in views folder
    //the {pokeon:} is the name we are giving the value of pokemon
  }).catch(err => {
    console.log("FIRE")
    console.log(err)
    res.send('error')
  }) //db.'pokemon' becuas that is the 'model' being pulled from
  // TODO: Get all records from the DB and render to view
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function (req, res) {
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  }).then(() => {
    res.redirect('/pokemon')
  }).catch(err => {
    console.log("FIRE")
    console.log(err)
    res.send('error')
  }) //find or create doens tallow multiples of the same 

  // TODO: Get form data and add a new record to DB

})

router.get('/:name', (req, res) => {
var apiURL = `http://pokeapi.co/api/v2/pokemon/${req.params.name}`// search url
axios.get(apiURL).then(response => { //fetch is build into browser - needs to be parsed--- axios doesnt need to be pasres
  var pokemon = response.data
  res.render('pokemon/show', {pokemon: pokemon})
  // console.log(pokeInfo) // this looks for the values and consoles them to view how to disperse them on the page
})
})


module.exports = router;
