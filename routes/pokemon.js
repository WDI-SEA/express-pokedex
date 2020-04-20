var express = require('express');
var router = express.Router();
let db = require('../models');
let axios = require('axios');
// GET /pokemon - return a page with favorited Pokemon
router.get('/faves', function(req, res) {
db.pokedex.findAll()
.then((pokemon) => {
  res.render('faves', { pokemon });
  })
  .catch(function(error) {
    res.send(error)
  })
});

router.get('/stats/:id', function(req, res) {
  var statsUrl = 'http://pokeapi.co/api/v2/pokemon/' + req.params.id;
  // Use request to call the API
  axios.get(statsUrl).then( function(apiResponse) {
    var pokemon = apiResponse.data;
    res.render('stats', { pokemon });
  })
});



router.post('/', function(req, res) {
 db.pokedex.create({
  name: req.body.name
 })
  .then(function() {
    res.redirect('pokemon/faves');
  })
  .catch(function(error) {
    res.send(error)
  })
})

module.exports = router;
