var express = require('express')
var db = require('../models')
var router = express.Router()
const axios = require('axios'); 

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.poki.findAll()
    .then(poki => {
        res.render('favs', { poki })
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.poki.create(req.body)
    .then(function(poke) {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err)
      res.send('this is broken')
  })
})

router.get('/:id', (req, res) => {
  db.poki.findOne({
    where: { id: req.params.id }
  })
  .then((poki) => {
  
      let name = poki.name
      var pokemon = `https://pokeapi.co/api/v2/pokemon/${name}/`;
      
      axios.get(pokemon).then( function(apiResponse) {
        var pokemon = apiResponse.data;
        res.render('details', { poki, pokemon: pokemon });
      })
      
    })

  .catch((err) => {
    res.render('error')
  })
})

module.exports = router;



