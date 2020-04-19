let express = require('express');
let router = express.Router();
let axios = require('axios');
let db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/favorites', function(req, res) {
db.poke.findAll()
.then((pokemon) => {
  res.render('favorites', { pokemon });
  })
  .catch(function(error) {
    res.send(error)
  })
});

// GET / - main index of site

router.get('/details/:id', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + req.params.id;
  // Use request to call the API
  axios.get(pokemonUrl).then( function(apiResponse) {
    var pokemon = apiResponse.data;
    console.log("here are the pikachus: ", pokemon)
    res.render('details', { pokemon });
  })
});


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
 db.poke.create({
  pokeId: req.body.pokeId,
  name: req.body.name
 })
  .then(function() {
    res.redirect('/pokemon/favorites');
  })
  .catch(function(error) {
    res.send(error)
  })
})

module.exports = router;
