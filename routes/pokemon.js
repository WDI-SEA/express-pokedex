const express = require('express');
const router = express.Router();
const db =require('../models');
const axios = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then((pokemon) => {
    res.render('./pokemon/index.ejs', { pokemon: pokemon})
  })
  .catch(err => {
    console.log(err)
  })
})


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  })
  .then(()=>{
    res.redirect('/pokemon')
  })
  .catch( error => console.log(error))

});





module.exports = router;