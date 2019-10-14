const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios')

const BASE_URL = `https://pokeapi.co/api/v2/pokemon/?limit=151`

router.get('/pokemon/:name', (req, res) => {
  request(BASE_URL + req.params.name, (err, response, body) => {
      if (err || response.statusCode != 200) {
          res.render('404')
          
      }
      else {
        //  res.send('STUB - poke types list')
        res.render('details', { pokemon: JSON.parse(body.data) })
      }
  })
})

// Routes
router.get('/', (req, res) => {
  db.pokemon.findAll()
  .then(pokemon => {
    res.render('faves', { pokemon })
  })
})

router.get('/details', function(req, res) {
  res.render('details')
}).then()

router.get('/:id', (req, res) => {
  if (parseInt(req.params.id)) {
    db.pokemon.findOne({
      where: { id: req.params.id }//,
      // include: [db.outfit]
    })
    .then(pokemon => {
      res.render('faves', { pokemon })
    })
  }
})


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  //res.send(req.body);
  db.pokemon.create(req.body)
  .then(createdPokemon => {
    res.redirect('/')
  })
});


module.exports = router;
