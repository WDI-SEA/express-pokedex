var express = require('express');
var router = express.Router();
const ejsLayouts = require('express-ejs-layouts');
// const axios= require('axios');
const db = require('./models');



db.pokemon.create({
  name: 'Pikachu'
}).then(function(poke) {
  console.log('Created: ', poke.name)
})

db.pokemon.findAll().then(function(poke) {
  console.log('Found: ', poke.name)
})


//ROUTES

// GET '/' homepage 
// router.get('/', function(req, res) {
//   res.render('index')
// })

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  res.send('Render a page of favorites here');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  res.send(req.body);
});


//The app.listen function returns a server handle
//var router = router.listen(process.env.PORT || 3000, () => console.log(`🎧 Listening to Port 3001`));

//How we can export this server to other servers 
module.exports = router;

