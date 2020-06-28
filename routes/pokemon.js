var express = require('express');
var router = express.Router();
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(pokemon => {
    res.render('pokemon/index', {pokemon: pokemon})// 'views/' is not needed becuase it was configred in the index,js pace because it already understands to begin in views folder
    //the {pokeon:} is the name we are giving the value of pokemon
  }).catch(err => {
    console.log("FIRE")
    console.log(err)
    res.send('error')
   }) //db.'pokemon' becuas that is the 'model' being pulled from
  // TODO: Get all records from the DB and render to view
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  res.send(req.body);
})



module.exports = router;
