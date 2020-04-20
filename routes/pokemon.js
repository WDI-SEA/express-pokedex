var express = require('express');
var router = express.Router();
var db = require('../models')
const axios = require('axios');


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function (req, res) {
  db.pokemon.findAll().then(function (bob) {
    res.render('faves', { bob });
    console.log(bob)
  })
    .catch(function (error) {
      res.send('error', error)
    })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function (req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  })
    .spread(function (poke, created) {
      if (created == false) {
        res.send('already in faves')
      }
      else {
        console.log('Success', poke.name)
        res.redirect('/')
      }
    })
    .catch(function (error) {
      res.send('error', error)
    })
})

router.get('/:id', function (req, res) {
  db.pokemon.findByPk(req.params.id)
  .then(function (poke){
    var url = `http://pokeapi.co/api/v2/pokemon/${poke.name}`
    axios.get(url)
    .then(function (xx) {
      var deets = xx.data
      res.render('show',{ deets })
    })
    .catch(function (err) {
      res.send(err)
    })
    })
})

module.exports = router;
