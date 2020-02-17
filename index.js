require('dotenv').config();
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const app = express();

const port = process.env.PORT || 3000;

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// GET / - main index of site
app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
  // Use request to call the API
  axios.get(pokemonUrl).then( function(apiResponse) {
    var pokemon = apiResponse.data.results;
    res.render('index', { pokemon: pokemon.slice(0, 151) });
    console.log(pokemon.slice(0, 151));
  })
});

const db = require('./models');
// POST / - add selected pokemon to db
app.post('/pokemon', function(req, res) {
  db.pokemon.create({
    name: req.body.name
  }).then(function(poke) {
    console.log('Created: ', poke.name)
    res.redirect('/');
  })
});

// GET /pokemon - return a page with favorited Pokemon
app.get('/pokemon', function(req, res) {
  // TODO: Get all records from the DB and render to view
    db.pokemon.findAll().then(function(poke) {
        res.render('favorites', { pokemon: poke });
        console.log(poke);
    }).catch(err => {
        console.log(err)
        res.send("ERROR");
    })
  // res.send('Render a page of favorites here');
});



// // testing...
// db.pokemon.create({
//   name: 'Charazar'
// }).then(function(poke) {
//   console.log('Created: ', poke.name)
// });

// db.pokemon.findAll().then(function(poke) {
//   console.log('Found: ', poke.name)
// });


// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));


var server = app.listen(port, function() {
  console.log('...listening on', port );
});

module.exports = server;
