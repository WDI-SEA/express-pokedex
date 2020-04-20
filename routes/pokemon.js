var express = require('express');
var router = express.Router();
var db = require('../models');
var axios = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(function(poke) { 
    res.render('faves', {poke});
  })
  .catch(function(err) {
    console.log(err)
    res.send('error')
  })
});



// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: { name: req.body.name }
  }).spread(function(ret, boo){
    console.log('hi', ret, 'HI DIDE', boo)
  })

  .catch(function(error) {
    res.send('error')
})
});

router.get('/:id', function(req, res) {
  db.pokemon.findByPk(req.params.id)
  .then(function (p) {
  let url = `http://pokeapi.co/api/v2/pokemon/${p.name}`
  axios.get(url)
  .then(function(s) {
    var detail = s.data
    console.log('hello world', detail)
    res.render('show', { detail })
  })
  .catch(function(err) {
    console.log(err)
    res.send('error')
  })
  })
})

module.exports = router;
