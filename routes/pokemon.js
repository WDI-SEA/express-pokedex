const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
    .then(poke =>{
      // console.log('this is fave', poke)
      res.render('/pokemon/index', {faves: poke})
    })
    .catch(error =>{
      console.error
    })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/addFave', (req, res) => {
  // TODO: Get form data and add a new record to DB
    const data = JSON.parse(JSON.stringify(req.body))
    res.send(req.body);
    db.pokemon.create({
      name: data.name
    })
    .then(createdFave =>{
      console.log('fave created', createdFave)
      res.redirect(`/faves/${createdFave.name}`)
    })
    .catch(error =>{
      console.error
    })
});

// SHOW 


module.exports = router;
