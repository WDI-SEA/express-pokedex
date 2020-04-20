var express = require('express');
var router = express.Router();
var db = require('../models');
const axios = require('axios');


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.favorites.create()
  .then((poke) => {
    res.send('Render a page of favorites here');
  })
  .catch((err) => {
    console.log('ERROR', err)
    res.render('error')
  })


});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  res.send(req.body);
});





// db.favorites.create({
//   name: 'Pikachu'
// }).then(function(poke) {
//   console.log('Created: ', poke.name)
// })

// db.favorites.findAll().then(function(poke) {
//   console.log('Found: ', poke.name)
// })


module.exports = router;