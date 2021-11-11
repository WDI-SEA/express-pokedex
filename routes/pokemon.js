const express = require('express');
const router = express.Router();
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  db.pokemon.findAll()
  .then(poke => {
    // console.log(poke)
    res.render('favorite.ejs', {results: poke})
  })
  .catch(error => {
    console.log(error);
  })
});



// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // console.log(req.body)
    const formData = JSON.parse(JSON.stringify(req.body))
    db.pokemon.create({
      name: formData.name
    })
    .then(created => {
      console.log('this is created', created)
    })

  
});

module.exports = router;
